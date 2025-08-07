declare module 'chart.js' {
  export class Chart {
    static register(...args: any[]): void
  }
  export const CategoryScale: any
  export const LinearScale: any
  export const BarElement: any
  export const Title: any
  export const Tooltip: any
  export const Legend: any
}
