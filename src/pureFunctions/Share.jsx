const Share = (title, url) => {
    const shareData = {
        title: title,
        url: url,
    }

    try {
        navigator.share(shareData)
    } catch (error) {
        console.log(error);
    }
}

export { Share }