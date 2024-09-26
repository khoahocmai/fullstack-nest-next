import { Menu } from '@/modules/menus/schemas/menu.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MenuItemDocument = HydratedDocument<MenuItem>;

@Schema({ timestamps: true })
export class MenuItem {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Menu.name })
    menu: mongoose.Schema.Types.ObjectId;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    basePrice: number;

    @Prop()
    image: string;

}

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);
