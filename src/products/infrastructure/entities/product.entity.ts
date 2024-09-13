import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column("text")
  description: string;

  @Column("decimal")
  price: number;

  @Column("numeric")
  stock: number;
}
