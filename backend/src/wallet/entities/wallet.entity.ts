import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/user/user.entity';
import { Base } from 'src/utils/DB/base';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('wallet')
export class WalletEntity extends Base {
  @ApiProperty()
  @Column({ unique: true })
  name?: string;

  @ApiProperty()
  @Column({ select: false })
  sum: number;

  @ManyToOne(() => UserEntity, (user) => user.wallet)
  userWallet: UserEntity;
  // @OneToMany(() => WalletEntity, (wallet) => wallet.wallts)
  // wallets: WalletEntity[];

  // @OneToMany(() => NotesEntity, (note) => note.notes)
  // note: NotesEntity[];
}
