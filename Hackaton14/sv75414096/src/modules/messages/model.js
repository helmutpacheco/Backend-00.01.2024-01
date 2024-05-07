import {schema, models} from "mongoose";

const schema = new schema(
{
    title: {
        type: String,
        required: true,
    },
    descrition: {
        type: String,
    },
},
 {
    timestamps: true,
}
);

export default model("note",schema);