export const NicheFilter = (influencers, fashion,
    health_and_fittness,
    beauty,
    mob_baby,
    travel,
    food_and_drink,
    model,
    lifestyle,
    automobiles_car_and_bike,
    entertainment,
    technology,
    electronic_gadgets,
    home_decor,
    art_photography,
    music_dance,
    entr_business,
    family_children,
    animals_pets,
    athlete_sports,
    adventure_outdoors,
    education,
    celebritypf,
    gaming,
    actor,
    healthcare,
    vegan,
    cannabis,
    skilled_trades,
    automotive


) => {
    const nichesBucket = [];
    if (
        fashion === false &&
        health_and_fittness === false &&
        beauty === false &&
        mob_baby === false &&
        travel === false &&
        food_and_drink === false &&
        model === false &&
        lifestyle === false &&
        automobiles_car_and_bike === false &&
        entertainment === false &&
        technology === false &&
        electronic_gadgets === false &&
        home_decor === false &&
        art_photography === false &&
        music_dance === false &&
        entr_business === false &&
        family_children === false &&
        animals_pets === false &&
        athlete_sports === false &&
        adventure_outdoors === false &&
        education === false &&
        celebritypf === false &&
        gaming === false &&
        actor === false &&
        healthcare === false &&
        vegan === false &&
        cannabis === false &&
        skilled_trades === false &&
        automotive === false


    ) {
        return influencers;
    }
    if (fashion) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "fashion" && nichesBucket.push(influencer)
        )
        )
    }
    if (health_and_fittness) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "health_and_fittness" && nichesBucket.push(influencer)
        )
        )
    }
    if (beauty) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "beauty" && nichesBucket.push(influencer)
        )
        )
    }
    if (mob_baby) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "mob_baby" && nichesBucket.push(influencer)
        )
        )
    }
    if (travel) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "travel" && nichesBucket.push(influencer)
        )
        )
    }
    if (food_and_drink) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "food_and_drink" && nichesBucket.push(influencer)
        )
        )
    }
    if (model) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "model" && nichesBucket.push(influencer)
        )
        )
    }
    if (lifestyle) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "lifestyle" && nichesBucket.push(influencer)
        )
        )
    }
    if (automobiles_car_and_bike) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "automobiles_car_and_bike" && nichesBucket.push(influencer)
        )
        )
    }
    if (entertainment) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "entertainment" && nichesBucket.push(influencer)
        )
        )
    }
    if (technology) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "technology" && nichesBucket.push(influencer)
        )
        )
    }
    if (electronic_gadgets) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "electronic_gadgets" && nichesBucket.push(influencer)
        )
        )
    }
    if (home_decor) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "home_decor" && nichesBucket.push(influencer)
        )
        )
    }
    if (art_photography) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "art_photography" && nichesBucket.push(influencer)
        )
        )
    } if (music_dance) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "music_dance" && nichesBucket.push(influencer)
        )
        )
    } if (entr_business) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "entr_business" && nichesBucket.push(influencer)
        )
        )
    } if (family_children) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "family_children" && nichesBucket.push(influencer)
        )
        )
    } if (animals_pets) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "animals_pets" && nichesBucket.push(influencer)
        )
        )
    } if (athlete_sports) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "athlete_sports" && nichesBucket.push(influencer)
        )
        )
    } if (adventure_outdoors) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "adventure_outdoors" && nichesBucket.push(influencer)
        )
        )
    } if (education) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "education" && nichesBucket.push(influencer)
        )
        )
    } if (celebritypf) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "celebritypf" && nichesBucket.push(influencer)
        )
        )
    } if (gaming) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "gaming" && nichesBucket.push(influencer)
        )
        )
    } if (actor) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "actor" && nichesBucket.push(influencer)
        )
        )
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toUpperCase() === "LGBTQ2" && nichesBucket.push(influencer)
        )
        )
    } if (healthcare) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "healthcare" && nichesBucket.push(influencer)
        )
        )
    } if (vegan) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "vegan" && nichesBucket.push(influencer)
        )
        )
    } if (cannabis) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "cannabis" && nichesBucket.push(influencer)
        )
        )
    } if (skilled_trades) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "skilled_trades" && nichesBucket.push(influencer)
        )
        )

    } if (automotive) {
        influencers.map((influencer) => influencer.niches.filter(niches =>
            niches.toLowerCase() === "automotive" && nichesBucket.push(influencer)
        )
        )
    }

    return nichesBucket;
}
