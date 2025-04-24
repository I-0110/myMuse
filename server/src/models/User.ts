import { Schema, Document, model, ObjectId } from 'mongoose';

interface IUser extends Document {
    first: string;
    last: string;
    age: number;
    posts: ObjectId[]; 
    fullName: string;
}

// Schema to create User model 
const userSchema = new Schema<IUser>(
    {
        first: String,
        last: String,
        age: Number,
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'post',
            },
        ],
    },
    { 
        toJSON: { 
            virtuals: true 
        },
        id: false,
    }
);

userSchema
    .virtual('fullName')
    // Getter
    .get(function (this: any) {
        return `${this.first} ${this.last}`;
    })
    // Setter 
    .set(function (this: any, v: any) {
        const first = v.split(' ')[0];
        const last = v.split(' ')[1];
        this.set({ first, last });
    });

// Initialize our User model
const User = model('user', userSchema);

export default User; 