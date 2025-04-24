import { Schema, model } from 'mongoose';
import Response from './Responses.js';

interface IPost { 
    published: boolean;
    createdAt: Date;
    text: string;
    responses: Response[];
}

// Schema to create Post model
const postSchema = new Schema<IPost>(
    {
        published: {
            type: Boolean,
            default: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        text: {
            type: String,
            minlength: 15,
            maxlength: 500,
        },
        responses: [Response]
    },
    { 
        toJSON: { 
            virtuals: true 
        },
        id: false,
    }
);

// Create a virtual property `responses` that gets the amount of response per user
postSchema
    .virtual('getResponses')
    // Getter
    .get(function () {
    return this.responses.length;
});

// Initialize our Post model
const Post = model('post', postSchema);

export default Post;  