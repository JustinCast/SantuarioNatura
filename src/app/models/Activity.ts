import { FileInterface } from "./file.interface";
import { Rate } from "./Rate";
export class Activity {
  public images: Array<FileInterface> = [];

  constructor(
    public name?: string,
    public description?: string,
    public difficulty?: string,
    public includes?: string,
    public duration?: string,
    public bring?: string,
    public location?: any,
    public access?: string,
    public visits?: number,
    public in_offer?: boolean,
    public rates?: Array<Rate>,
    public id?: number
  ) {}

  public getImages(): Array<any> {
    return this.images;
  }

  public setImages(image: FileInterface): void {
    this.images.push(image);
  }
}
