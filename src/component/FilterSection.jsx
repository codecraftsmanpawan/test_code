import React, { useState } from "react";
import { useType } from "../hooks/type-context";

const FilterSection = () => {
  const [val, setVal] = useState("");
  const { typeState, typeDispatch } = useType();
  const { channel, niches } = typeState;

  return (
    <div>
      <div className="filter_sect">
        <div className="sidebar-wrapper">
          <h3 className="card-title mb-3 plr15">
            <i className="fa-sharp fa-solid fa-filter"></i> Filter
          </h3>
          <div className="sect-dvr">
            <h4 className="subhding">By Follower</h4>
            <select
              className="custom-select"
              onChange={e => setVal(e.target.value)}
            >
              <option value="youtube">YouTube</option>
              <option value="Instagram">Instagram</option>
              <option value="facebook">Facebook</option>
            </select>
          </div>

          <div className="sect-dvr">
            <h5 className="my-4">Niches</h5>

            <div className="form-check  custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.fashion}
                id="fashion"
                onChange={() => typeDispatch({ type: "FASHION" })}
              />
              <label className="form-check-label" htmlFor="fashion">
                Fashion
              </label>
            </div>
            <div className="form-check  custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.health_and_fittness}
                id="health_and_fittness"
                onChange={() => typeDispatch({ type: "HEALTH_AND_FITTNESS" })}
              />
              <label className="form-check-label" htmlFor="health_and_fittness">
                health_and_fittness
              </label>
            </div>
            <div className="form-check custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.beauty}
                id="beauty"
                onChange={() => typeDispatch({ type: "BEAUTY" })}
              />
              <label className="form-check-label" htmlFor="beauty">
                beauty
              </label>
            </div>
            <div className="form-check custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.mob_baby}
                id="mob_baby"
                onChange={() => typeDispatch({ type: "MOB_BABY" })}
              />
              <label className="form-check-label" htmlFor="mob_baby">
                mob_baby
              </label>
            </div>
            <div className="form-check  custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.travel}
                id="travel"
                onChange={() => typeDispatch({ type: "TRAVEL" })}
              />
              <label className="form-check-label" htmlFor="travel">
                travel
              </label>
            </div>
            <div className="form-check custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.food_and_drink}
                id="food_and_drink"
                onChange={() => typeDispatch({ type: "FOOD_AND_DRINK" })}
              />
              <label className="form-check-label" htmlFor="food_and_drink">
                food_and_drink
              </label>
            </div>
            <div className="form-check  custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.model}
                id="model"
                onChange={() => typeDispatch({ type: "MODEL" })}
              />
              <label className="form-check-label" htmlFor="model">
                model
              </label>
            </div>

            <div className="form-check custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.lifestyle}
                id="lifestyle"
                onChange={() => typeDispatch({ type: "LIFESTYLE" })}
              />
              <label className="form-check-label" htmlFor="lifestyle">
                lifestyle
              </label>
            </div>
            <div className="form-check  custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.automobiles_car_and_bike}
                id="automobiles_car_and_bike"
                onChange={() =>
                  typeDispatch({ type: "AUTOMOBILES_CAR_AND_BIKE" })
                }
              />
              <label
                className="form-check-label"
                htmlFor="automobiles_car_and_bike"
              >
                automobiles_car_and_bike
              </label>
            </div>
            <div className="form-check  custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.entertainment}
                id="entertainment"
                onChange={() => typeDispatch({ type: "ENTERTAINMENT" })}
              />
              <label className="form-check-label" htmlFor="entertainment">
                entertainment
              </label>
            </div>
            <div className="form-check custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.technology}
                id="technology"
                onChange={() => typeDispatch({ type: "TECHNOLOGY" })}
              />
              <label className="form-check-label" htmlFor="technology">
                technology
              </label>
            </div>
            <div className="form-check custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.electronic_gadgets}
                id="electronic_gadgets"
                onChange={() => typeDispatch({ type: "TECHNOLOGY" })}
              />
              <label className="form-check-label" htmlFor="electronic_gadgets">
                electronic_gadgets
              </label>
            </div>
            <div className="form-check custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.home_decor}
                id="homedecor"
                onChange={() => typeDispatch({ type: "HOME_DECOR" })}
              />
              <label className="form-check-label" htmlFor="homedecor">
                home-decor
              </label>
            </div>


            {/* 
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
            LGBTQ2,
            healthcare,
            vegan,
            cannabis,
            skilled_trades,
            automotive
             */}


            {/* New filter implementation */}
            <div className="form-check custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.art_photography}
                id="art_photography"
                onChange={() => typeDispatch({ type: "ART_PHOTOGRAPHY" })}
              />
              <label className="form-check-label" htmlFor="art_photography">
                Art Photography
              </label>
            </div>
            <div className="form-check custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.music_dance}
                id="music_dance"
                onChange={() => typeDispatch({ type: "MUSIC_DANCE" })}
              />
              <label className="form-check-label" htmlFor="music_dance">
                Music Dance
              </label>
            </div><div className="form-check custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.entr_business}
                id="entr_business"
                onChange={() => typeDispatch({ type: "ENTR_BUSINESS" })}
              />
              <label className="form-check-label" htmlFor="entr_business">
                Entr Business
              </label>
            </div><div className="form-check custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.family_children}
                id="family_children"
                onChange={() => typeDispatch({ type: "FAMILY_CHILDREN" })}
              />
              <label className="form-check-label" htmlFor="family_children">
                Family Children
              </label>
            </div><div className="form-check custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.animals_pets}
                id="animals_pets"
                onChange={() => typeDispatch({ type: "ANIMALS_PETS" })}
              />
              <label className="form-check-label" htmlFor="animals_pets">
                Animal Pets
              </label>
            </div><div className="form-check custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.athlete_sports}
                id="athlete_sports"
                onChange={() => typeDispatch({ type: "ATHLETE_SPORTS" })}
              />
              <label className="form-check-label" htmlFor="athlete_sports">
                Athlete Sports
              </label>
            </div><div className="form-check custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.adventure_outdoors}
                id="adventure_outdoors"
                onChange={() => typeDispatch({ type: "ADVENTURE_OUTDOORS" })}
              />
              <label className="form-check-label" htmlFor="adventure_outdoors">
                Adventure Outdoors
              </label>
            </div><div className="form-check custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.education}
                id="education"
                onChange={() => typeDispatch({ type: "EDUCATION" })}
              />
              <label className="form-check-label" htmlFor="education">
                Education
              </label>
            </div><div className="form-check custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.celebritypf}
                id="celebritypf"
                onChange={() => typeDispatch({ type: "CELEBRITYPF" })}
              />
              <label className="form-check-label" htmlFor="celebritypf">
                Celebritypf
              </label>
            </div><div className="form-check custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.gaming}
                id="gaming"
                onChange={() => typeDispatch({ type: "GAMING" })}
              />
              <label className="form-check-label" htmlFor="gaming">
                Gaming
              </label>
            </div><div className="form-check custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.actor}
                id="actor"
                onChange={() => typeDispatch({ type: "ACTOR" })}
              />
              <label className="form-check-label" htmlFor="actor">
                Actor
              </label>
            </div>

            <div className="form-check custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.healthcare}
                id="healthcare"
                onChange={() => typeDispatch({ type: "HEALTHCARE" })}
              />
              <label className="form-check-label" htmlFor="healthcare">
                Healthcare
              </label>
            </div><div className="form-check custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.vegan}
                id="vegan"
                onChange={() => typeDispatch({ type: "VEGAN" })}
              />
              <label className="form-check-label" htmlFor="vegan">
                Vegan
              </label>
            </div><div className="form-check custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.cannabis}
                id="cannabis"
                onChange={() => typeDispatch({ type: "CANNABIS" })}
              />
              <label className="form-check-label" htmlFor="cannabis">
                Cannabis
              </label>
            </div><div className="form-check custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.skilled_trades}
                id="skilled_trades"
                onChange={() => typeDispatch({ type: "SKILLED_TRADES" })}
              />
              <label className="form-check-label" htmlFor="skilled_trades">
                Skilled Trades
              </label>
            </div><div className="form-check custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={niches.automotive}
                id="automotive"
                onChange={() => typeDispatch({ type: "AUTOMOTIVE" })}
              />
              <label className="form-check-label" htmlFor="automotive">
                Automotive
              </label>
            </div>




          </div>
          <div className="sect-dvr">
            <h4 className="subhding">Channel</h4>

            <div className="form-check  custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                checked={channel.youtube}
                onChange={() => typeDispatch({ type: "YOUTUBE" })}
                id="youtube"
              />
              <label className="form-check-label" htmlFor="youtube">
                YouTube
              </label>
            </div>
            <div className="form-check  custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                checked={channel.instagram}
                onChange={() => typeDispatch({ type: "INSTAGRAM" })}
                id="instagram"
              />
              <label className="form-check-label" htmlFor="instagram">
                Instagram
              </label>
            </div>
            <div className="form-check  custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                checked={channel.facebook}
                onChange={() => typeDispatch({ type: "FACEBOOK" })}
                id="facebook"
              />
              <label className="form-check-label" htmlFor="facebook">
                Facebook
              </label>
            </div>

            <div className="form-check custom-control custom-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                checked={channel.twitter}
                onChange={() => typeDispatch({ type: "TWITTER" })}
                id="twitter"
              />
              <label className="form-check-label" htmlFor="twitter">
                Twitter
              </label>
            </div>
          </div>

      
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
