import { Replace } from "src/helpers/replace";
import { Content } from "./notification-content";

export interface NotificationProps{
  content: Content;
  category: string;
  readAt?: Date | null;
  recipientId: string;
  createdAt: Date;
}

export class Notification {
  private props: NotificationProps;

  constructor(props: Replace<NotificationProps, { createdAt?: Date }>){
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date()
    }
  }

  //Setters
  public set content(content: Content){
    this.props.content = content;
  }

  public set category(category: string){
    this.props.category = category;
  }

  public set readAt(readAt: Date | null | undefined){
    this.props.readAt = readAt;
  }

  public set recipientId(recipientId: string){
    this.props.recipientId = recipientId;
  }

  //Getters
  public get content(): Content{
    return this.props.content;
  }

  public get category(): string{
    return this.props.category;
  }

  public get recipientId(): string{
    return this.props.recipientId;
  }

  public get readAt(): Date | null | undefined{
    return this.props.readAt;
  }

  public get createdAt(): Date{
    return this.props.createdAt;
  }
}