
import Wishlist from "../pages/Wishlist"



const typeReducer = (pre, cur) => {


    switch (cur.type) {
        case 'INITIAL_INFLUENCERS':
            return {
                ...pre, allInfluencers: cur.payload
            }
        case 'ADD_TO_WISHLIST':
            console.log(Wishlist)
            return {
                ...pre,
                influencers: pre.influencers.map((influencer) => ({
                    ...influencer, wishList: cur.payload.some((item) => item.id === influencer.id)
                })),

            }

        case "YOUTUBE":
            return {
                ...pre,
                channel: {
                    ...pre.channel,
                    youtube: !pre.channel.youtube
                }
            };
        case "INSTAGRAM":
            return {
                ...pre,
                channel: {
                    ...pre.channel,
                    instagram: !pre.channel.instagram
                }
            };
        case "FACEBOOK":
            return {
                ...pre,
                channel: {
                    ...pre.channel,
                    facebook: !pre.channel.facebook
                }
            };
        case "TWITTER":
            return {
                ...pre,
                channel: {
                    ...pre.channel,
                    twitter: !pre.channel.twitter
                }
            };
        case "ENTERTAINMENT":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    entertainment: !pre.niches.entertainment
                }
            };
        case "FASHION":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    fashion: !pre.niches.fashion
                }
            };
        case "HEALTH_AND_FITTNESS":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    health_and_fittness: !pre.niches.health_and_fittness
                }
            };
        case "BEAUTY":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    beauty: !pre.niches.beauty
                }
            };
        case "MOB_BABY":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    mob_baby: !pre.niches.mob_baby
                }
            };
        case "TRAVEL":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    travel: !pre.niches.travel
                }
            };
        case "FOOD_AND_DRINK":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    food_and_drink: !pre.niches.food_and_drink
                }
            };
        case "MODEL":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    model: !pre.niches.model
                }
            };
        case "LIFESTYLE":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    lifestyle: !pre.niches.lifestyle
                }
            };
        case "AUTOMOBILES_CAR_AND_BIKE":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    automobiles_car_and_bike: !pre.niches.automobiles_car_and_bike
                }
            };
        case "ELECTRONIC_GADGET":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    electronic_gadgets: !pre.niches.electronic_gadgets
                }
            };
        case "HOME_DECOR":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    home_decor: !pre.niches.home_decor
                }
            };
        case "TECHNOLOGY":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    technology: !pre.niches.technology
                }
            };



        case "ART_PHOTOGRAPHY":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    art_photography: !pre.niches.art_photography
                }
            };
        case "MUSIC_DANCE":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    music_dance: !pre.niches.music_dance
                }
            };
        case "ENTR_BUSINESS":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    entr_business: !pre.niches.entr_business
                }
            };
        case "FAMILY_CHILDREN":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    family_children: !pre.niches.family_children
                }
            };
        case "ANIMALS_PETS":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    animals_pets: !pre.niches.animals_pets
                }
            };
        case "ATHLETE_SPORTS":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    athlete_sports: !pre.niches.athlete_sports
                }
            };
        case "ADVENTURE_OUTDOORS":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    adventure_outdoors: !pre.niches.adventure_outdoors
                }
            };
        case "EDUCATION":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    education: !pre.niches.education
                }
            };
        case "CELEBRITYPF":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    celebritypf: !pre.niches.celebritypf
                }
            };
        case "GAMING":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    gaming: !pre.niches.gaming
                }
            };
        case "ACTOR":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    actor: !pre.niches.actor
                }
            };

        case "HEALTHCARE":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    healthcare: !pre.niches.healthcare
                }
            };
        case "VEGAN":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    vegan: !pre.niches.vegan
                }
            };
        case "CANNABIS":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    cannabis: !pre.niches.cannabis
                }
            };
        case "SKILLED_TRADES":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    skilled_trades: !pre.niches.skilled_trades
                }
            };
        case "AUTOMOTIVE":
            return {
                ...pre,
                niches: {
                    ...pre.niches,
                    automotive: !pre.niches.automotive
                }
            };
        default:
            return pre
    }


}

export default typeReducer;