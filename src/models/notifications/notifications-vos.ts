export enum ENotifLevel {
    SUCCESS = 'success',
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error'
}

export interface INotification {
    title: string
    level: ENotifLevel
    id?: number
}
  
export interface NotificationsState {
    notifications: INotification[]
    visible: boolean
    expanded: boolean
}