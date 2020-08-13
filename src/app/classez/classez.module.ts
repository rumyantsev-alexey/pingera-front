export  class SubTaskDto {
  date1: string
  result: string
  successfully: boolean
}

export class Ping {
  successFlag: boolean
  timeoutFlag: boolean
  errorMessage: string
  throwable: string
  host: string
  size: number
  rtt: number
  ttl: number
  duration: number

}


export class Task {
  id:number
  cnt: number
  date1: Date
  name1: string
  packetsize: number
  sellist1: string
  sellist2: string
  sellist3: string
  sellist4: string
  text2: string
  text3: number
  text4: string
  timeout: number
  ttl: number
  total: number
  actual: boolean
}
