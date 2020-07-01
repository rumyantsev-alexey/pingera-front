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

export class User {
  id: number
  name: string
  email: string
  password: string
}

export class UserDto {
  name: string
  password: string
}

export class TaskDto {
  cnt: number = 2
  date1: string = new Date(new Date().getTime() + (10 * 60 * 1000)).toLocaleString()
  name1: string
  packetsize: number = 32
  sellist1: string = "pinger"
  sellist2: string = "hrs"
  sellist3: string = "result=all"
  sellist4: string = "email"
  text2: string
  text3: number = 1
  text4: string
  timeout: number = 53
  ttl: number = 53
  total: number = 2
}

export class Task {
  id:number
  cnt: number
  date1: string
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
