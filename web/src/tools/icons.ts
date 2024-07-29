export function getCategoryIcon(cat: string): string[] {
    switch (cat) {
        case "خوراکی":
            return ["fas", "burger"]
        case "نوشیدنی":
            return ["fas", "wine-bottle"]
        case "تفریح":
            return ["fas", "volleyball"]
        case "موسیقی":
            return ["fas", "music"]
        default:
            return ["fas", "layer-group"]
    }
}