# social-network-api

## Description
The Social Network API is a backend application for users to post their thoughts, add a reaction to user's thoughts, and allow users to add friends to their friend list. User can use CRUD method to access those functions. You can use CRUD methods for User and Thought Schema, while friend list and reactions only use POST and DELETE methods. 

## Instruction
Run npm i in the command line to install node_modules, then do npm start in the command line to start the application. Test the CRUD routes in Insomnia or PostMan.

## API Routes
For User: </br>
GET all and POST at: /api/users </br>
GET one, PUT, and DELETE at: /api/users/:id </br>
add friend and remove friend: /api/users/:userId/friends/:friendId </br>
</br>
For Thought Routes: </br>
GET all and POST at: /api/thoughts </br>
GET one, PUT, and DELETE at: /api/thoughts/:id</br>
add reaction: /api/thoughts/:thoughtId/reactions</br>
remove reaction: /api/thoughts/:thoughtId/reactions/:reactionId</br>
## Model and Schema
In order to create Model and Schema for user and thought, { Schema, Model} properties must be required from mongoose. { Type } property is required for Reaction Schema. The User, Thought, and Reaction models and schemas are outlined as following:  

### 1. User Model and Schema
```
const UserSchema = new Schema({
    username: {type: String, unique: true, required: true, trim: true},
    email: {type: String, required: true, unique: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: 'Please enter a valid email'
        },
    },
    thoughts: [{type: Schema.Types.ObjectId, ref: 'Thought'}],
    friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
},
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', UserSchema);
```

### 2. Thought Model and Schema
```
const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
},
    {
        toJSON: {
            getters: true
        }
    }
)

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);
```

### 3. Reaction Schema
```
const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
},
    {
        toJSON: {
            getter: true
        },
        id: false
    }
)
```

## Technology Used
Express.js, Mongoose, MongoDB, Insomnia

## Walkthrough Video and Repo URL
YouTube URL: https://youtu.be/IImagpFD-ho

Repo URL: https://github.com/freezenleo/social-network-api
