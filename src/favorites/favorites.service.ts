import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite, FavoriteDocument } from './Favorite.schema';
import { CreateFavoriteDto } from './dto/create-Favorite.dto';
import { UserDocument } from 'src/users/user.schema';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite.name) private FavoriteModel: Model<FavoriteDocument>,
  ) {}

  createFavorite(
    createFavoriteDto: CreateFavoriteDto,
    user: UserDocument,
    groupId: string,
  ) {
    const createdFavorite = new this.FavoriteModel({
      ...createFavoriteDto,
      groupId,
      user,
    });
    return createdFavorite.save();
  }
}
