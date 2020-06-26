export class UserDto {
  id: number
  name: string
  password: string
}

export class TaskDto {
  cnt: number = 2
  date1: string
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
}
