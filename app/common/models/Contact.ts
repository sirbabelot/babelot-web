export class Contact {

  constructor(
    private id: string,
    private email: string,
    private nickname: string,
    private img_url: string,
    private room: string,
    public messages) {
      if (this.id) {
        this.messages = [{author: 'jon', body: 'jim is cool'}]
      }
    }

}
