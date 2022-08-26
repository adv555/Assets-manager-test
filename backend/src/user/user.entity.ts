import { Base } from 'src/utils/DB/base';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('user')
export class UserEntity extends Base {
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: '' })
  name: string;

  @Column({ default: false, name: 'is_verify' })
  isVerified: boolean;

  @Column({ default: '', name: 'vatar_path' })
  avatarPath?: string;

  // @OneToMany(() => WalletEntity, (wallet) => wallet.wallts)
  // wallets: WalletEntity[];

  // @OneToMany(() => NotesEntity, (note) => note.notes)
  // note: NotesEntity[];
}
