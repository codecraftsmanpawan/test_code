import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { baseURL } from "../hooks/config";

const NotificationPost = (msg, to) => {

    const token = JSON.parse(localStorage.getItem("token"));
    const [notification, setNotification] = useState([])

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token.idToken}`);

    const raw = {
        textMessage: msg,
        status: "",
        receiverId: to
    };

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    useEffect(async () => {
        const response = await fetch(`${baseURL}/sendNotification`, requestOptions);
        const result = await response.json();
        setNotification(result)
        toast("new notification")


    }, [msg])



    return notification


}

export default NotificationPost