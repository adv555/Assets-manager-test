import { ApiProperty } from '@nestjs/swagger';
import { Base } from 'src/utils/DB/base';
import { WalletEntity } from 'src/wallet/entities/wallet.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('user')
export class UserEntity extends Base {
  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column({ select: false })
  password: string;

  @ApiProperty()
  @Column({ default: '' })
  name?: string;

  @ApiProperty()
  @Column({ default: '' })
  refreshTokenHash?: string;

  @ApiProperty()
  @Column({ default: '' })
  activationLink?: string;

  @ApiProperty()
  @Column({ default: false, name: 'is_verify' })
  isVerified?: boolean;

  @ApiProperty()
  @Column({ default: '', name: 'avatar_path' })
  avatarPath?: string;

  @OneToMany(() => WalletEntity, (wallet) => wallet.userWallet)
  wallet?: WalletEntity[];
  // @OneToMany(() => WalletEntity, (wallet) => wallet.wallts)
  // wallets: WalletEntity[];

  // @OneToMany(() => NotesEntity, (note) => note.notes)
  // note: NotesEntity[];
}
