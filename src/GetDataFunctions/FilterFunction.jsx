
// export const FilterFunction = (influencers, channel) => {

//     let bucket = [];
//     // const channelData = channel.forEach((score) => console.log(score));
//     // console.log(channelData, "channel");
//     if (channel !== "All") {
//         const packageFilter = influencers.map((influencer) => influencer.packages.filter(packages => channel.includes(packages.platform.toLowerCase()) ? bucket.push(influencer) : influencers))

//         console.log(packageFilter)
//         console.log(bucket, "bucket")
//         // console.log(platformFilter, "platformFilter")
//     }
//     return influencers
// }

const ChannelFuntion = (influencers, youtube, instagram, facebook, telegram) => {
    const channelBucket = [];
    if (
        youtube === false &&
        facebook === false &&
        instagram === false &&
        telegram === false
    ) {
        return influencers;
    }
    if (youtube) {
        influencers.map((influencer) => influencer.packages.filter(packages => packages.platform.toLowerCase() === "youtube" && channelBucket.push(influencer)))


    }
    if (facebook) {
        influencers.map((influencer) => influencer.packages.filter(packages => packages.platform.toLowerCase() === "facebook" && channelBucket.push(influencer)))


    }
    if (instagram) {
        influencers.map((influencer) => influencer.packages.filter(packages => packages.platform.toLowerCase() === "instagram" && channelBucket.push(influencer)))


    }
    if (telegram) {
        influencers.map((influencer) => influencer.packages.filter(packages => packages.platform.toLowerCase() === "telegram" && channelBucket.push(influencer)))

    }
    return channelBucket;
};

export { ChannelFuntion };