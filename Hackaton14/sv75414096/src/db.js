import { connect } from "mongoose";
import { mongodb_uri } from "./modules/messages/config";

export const connect08=async () => {

    try{
        await connect(mongodb_uri);
        console.log("connect to db");
    } catch(error){
        console.error(error);
    }
};