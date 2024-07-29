import { Log } from "@/services/models";
import { reactive } from "vue";
import { listLogs, createLog, updateLog, deleteLog } from '@/services/api';
import { errorStore } from '@/store/error';
import { Mode } from "./models";


export const logStore = reactive({
    logs: Array<Log>(),
    loading: false,
    total: 0,
    take: 20,
    skip: 0,
    modalMode: Mode.CLOSED,
    log: new Log("", "", []),
    async fetchLogs(value: string) {
        this.logs = [];
        this.loading = true
        const res = await listLogs(value, this.take, this.skip)
        if (res.error) errorStore.submit(res.error)
        else if (res.data) {
            this.logs = res.data.logs;
            this.total = res.data.count;
            this.loading = false;
        }
    },
    async addOrEditSubmit() {
        const res = this.log.id ? await updateLog(this.log) : await createLog(this.log);
        if (res.error) errorStore.submit(res.error)
        else if (res.data) {
            this.fetchLogs("")
            this.modalMode = Mode.CLOSED
        }
    },
    async deleteSubmit() {
        const res = await deleteLog(this.log)
        if (res.error) errorStore.submit(res.error)
        else if (res.data) {
            this.fetchLogs("")
            this.modalMode = Mode.CLOSED
        }
    },
    edit(log: Log) {
        this.log = JSON.parse(JSON.stringify(log));
        this.modalMode = Mode.EDIT
    },
    add() {
        this.log = new Log("", "", [])
        this.modalMode = Mode.ADD
    },
    delete(log: Log) {
        this.log = log
        this.modalMode = Mode.DELETE
    },
})