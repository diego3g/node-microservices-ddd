export interface ISubscribeContactRequestDTO {
  email: string;
  tags: Array<{
    title: string;
    integrationId?: string;
  }>;
}
