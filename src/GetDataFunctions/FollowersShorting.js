export function followersShorting(influencers) {

    const shorted = influencers.sort((a, b) => b.followerRange - a.followerRange)

    return shorted
}