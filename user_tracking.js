class VisitAndDemoTracker {
    constructor() {
        this.curr_time = Date.now(); // e.g., 1728337153352, ms elapsed since January 1, 1970, 00:00:00 UTC
        this.user_data = { // JS object to store data is quick to setup and iterate on, but is not scalable and does not persist 
            1: {
                attrs: {
                    on_mobile_device: false,
                    is_located_in_usa: false,
                    is_located_near_a_paramark_hub: true,
                    is_enterprise: true,
                    on_trial: true,
                    came_from_ad: false,
                    came_from_email: true,
                    came_from_search: false,
                    came_from_docs: false,
                    came_from_referral_link: false,
                    using_chrome: false,
                    has_account: true,
                    is_account_manager: false,
                    interacted_with_support: false,
                    has_account_owner: false,
                    positive_NPS_score: false,
                    has_ad_blocker: true,
                    early_stage_company: false,
                    is_subscribed: true,
                    default_language_english: true,
                },
                visits: [
                    1696694400000, // 1 hour ago
                    1696694400000, // 1 hour ago
                    1696694400000, // 1 hour ago
                    1696690800000, // 2 hours ago
                    1696687200000, // 3 hours ago
                ],
            },
            2: {
                attrs: {
                    on_mobile_device: false,
                    is_located_in_usa: true,
                    is_located_near_a_paramark_hub: true,
                    is_enterprise: false,
                    on_trial: false,
                    came_from_ad: true,
                    came_from_email: false,
                    came_from_search: true,
                    came_from_docs: false,
                    came_from_referral_link: true,
                    using_chrome: true,
                    has_account: false,
                    is_account_manager: true,
                    interacted_with_support: true,
                    has_account_owner: true,
                    positive_NPS_score: true,
                    has_ad_blocker: false,
                    early_stage_company: true,
                    is_subscribed: false,
                    default_language_english: false,
                },
                visits: [
                    1696690800000, // 2 hours ago
                    1696687200000, // 6 hours ago
                    1696687200000, // 6 hours ago
                    1696687200000, // 6 hours ago
                    1696683600000, // 12 hours ago
                    1696676400000, // 20 hours ago
                ],
            },
            3: {
                attrs: {
                    on_mobile_device: true,
                    is_located_in_usa: true,
                    is_located_near_a_paramark_hub: true,
                    is_enterprise: false,
                    on_trial: true,
                    came_from_ad: false,
                    came_from_email: true,
                    came_from_search: false,
                    came_from_docs: true,
                    came_from_referral_link: false,
                    using_chrome: false,
                    has_account: true,
                    is_account_manager: false,
                    interacted_with_support: false,
                    has_account_owner: false,
                    positive_NPS_score: true,
                    has_ad_blocker: true,
                    early_stage_company: false,
                    is_subscribed: true,
                    default_language_english: true,
                },
                visits: [
                    1696683600000, // 4 hours ago
                    1696683600000, // 4 hours ago
                    1696680000000, // 8 hours ago
                    1696665600000, // 16 hours ago
                    1696662000000, // 22 hours ago
                ],
            },
            4: {
                attrs: {
                    on_mobile_device: false,
                    is_located_in_usa: false,
                    is_located_near_a_paramark_hub: true,
                    is_enterprise: true,
                    on_trial: true,
                    came_from_ad: true,
                    came_from_email: false,
                    came_from_search: true,
                    came_from_docs: false,
                    came_from_referral_link: false,
                    using_chrome: true,
                    has_account: false,
                    is_account_manager: false,
                    interacted_with_support: true,
                    has_account_owner: true,
                    positive_NPS_score: false,
                    has_ad_blocker: false,
                    early_stage_company: true,
                    is_subscribed: false,
                    default_language_english: true,
                },
                visits: [
                    1696690800000, // 2 hours ago
                    1696687200000, // 3 hours ago
                    1696687200000, // 3 hours ago
                    1696683600000, // 12 hours ago
                    1696676400000, // 20 hours ago
                ],
            },
            5: {
                attrs: {
                    on_mobile_device: true,
                    is_located_in_usa: true,
                    is_located_near_a_paramark_hub: true,
                    is_enterprise: false,
                    on_trial: true,
                    came_from_ad: false,
                    came_from_email: true,
                    came_from_search: false,
                    came_from_docs: false,
                    came_from_referral_link: true,
                    using_chrome: false,
                    has_account: true,
                    is_account_manager: false,
                    interacted_with_support: false,
                    has_account_owner: false,
                    positive_NPS_score: true,
                    has_ad_blocker: true,
                    early_stage_company: false,
                    is_subscribed: true,
                    default_language_english: true,
                },
                visits: [
                    1696690800000, // 2 hours ago
                    1696690800000, // 2 hours ago
                    1696687200000, // 3 hours ago
                    1696683600000, // 12 hours ago
                ]
            }
        };
    }

    // Function to record user views/visits to our in-memory object this.user_data
    track_view(user_id, attrs) {
        // Keep track of all visits, even from the same user_id
        if (!this.user_data[user_id]) {
            this.user_data[user_id] = {
                attrs: attrs,
                visits: [this.curr_time],
                demo_booked: false // First time visitor won't have a demo_booked yet
            }
        } else {
            this.user_data[user_id].visits.push(this.curr_time)
        }
    };

    // Function to record when a user books a demo
    track_book_demo(user_id) {
        // Assume "track_book_demo will be called at most once for a given user_id" and "a user will always view the site before they book a demo"
        this.user_data[user_id].demo_booked = true;
    }

    // Function to count # of views in the last 24 hrs
    get_views_last_24hr() {
        let view_count = 0;
        let curr_time_minus_24_hrs = this.curr_time - (24*60*60*1000) // curr_time is in ms so this calculates 24 hrs ago

        // Loop through all user data and count visits from last 24 hrs
        for (const user_id in this.user_data) {
            view_count += this.user_data[user_id].visits.filter(visit => visit > curr_time_minus_24_hrs).length;
        }

        return view_count;
    }

    // Function to count # of demos booked in the last 24 hours
    get_demos_last_24hr() {
        let demo_count = 0;
        let curr_time_minus_24_hrs = this.curr_time - (24*60*60*1000)

        for (const user_id in this.user_data) {
            if (this.user_data[user_id].demo_booked && this.user_data[user_id].visits.some(visit => visit > curr_time_minus_24_hrs)) {
                demo_count++;
            }
        }

        return demo_count;
    }

    // Function to calculate moving averages of views
   moving_average_views(duration) {

        // time_pairs will store timestamps and their corresponding averages
        const time_pairs = [];
        let total_views = 0;

        // For each hour in the specified duration
        for (let hour = 0; hour < duration; hour++) {
            // Get the time for the current hour of the iteration
            const time_at_hour = this.curr_time - hour*60*60*1000;

            // Count views per current hour by checking each user's visits within range
            for (const user_id in this.user_data) {
                total_views += this.user_data[user_id].visits.filter(visit => 
                    visit <= time_at_hour && visit > (time_at_hour - 60*60*1000) // only inclusive of given hour e.g. 1:01pm to 2pm if given hour is 2pm
                ).length;
            }

            let moving_average = 0;
            if (hour < 6) {
                // Average of the hours up until now (e.g. if you're at hour 2, you'll have 3 hours worth of data: 0,1,2)
                moving_average = total_views / (hour + 1); 
            } else {
                // If your duration is > 6, calculate a true rolling average
                moving_average = total_views / 6; 
            }
            
            // Push the time and avg as a pair
            time_pairs.push([time_at_hour, moving_average]);
        }

        return time_pairs;
    }

    // Function to calculate moving averages filtered by attribute
    moving_average_views_by_query(duration, attribute) {
        const time_pairs = [];
        let total_views = 0;

        for (let hour = 0; hour < duration; hour++) {
            const time_at_hour = this.curr_time - (hour*60*60*1000);
            let hour_count = 0;

            for (const user_id in this.user_data) {
                const attrs = this.user_data[user_id].attrs;
                // Only count if the attribute matches
                if (attrs[attribute[0]] === attribute[1]) {
                    hour_count += this.user_data[user_id].visits.filter(visit => visit <= time_at_hour && visit > (time_at_hour - 60*60*1000)).length;
                }
            }

            total_views += hour_count;
            let moving_average = 0;
            if (hour < 6) {
                moving_average = (total_views / (hour + 1));
            } else {
                moving_average = (total_views / 6); 
            }
            time_pairs.push([time_at_hour, moving_average]);        }

        return time_pairs;
    }

    // Function to calculate moving averages of views, optionally filtered by an attribute
    combined_moving_average_views(duration, attribute = null) {
        // Array to store timestamps and their corresponding averages
        const time_pairs = [];
        let total_views = 0;

        // For each hour in the specified duration
        for (let hour = 0; hour < duration; hour++) {
            // Get the timestamp for the current hour of the iteration
            const time_at_hour = this.curr_time - hour*60*60*1000;
            let hour_count = 0;

            // Count views for the current hour by checking each user's visits
            for (const user_id in this.user_data) {
                const user_visits = this.user_data[user_id].visits;

                // Check if filtering by attribute
                if (attribute) {
                    const attrs = this.user_data[user_id].attrs;
                    // Only count if the attribute matches
                    if (attrs[attribute[0]] === attribute[1]) {
                        hour_count += user_visits.filter(visit => 
                            visit <= time_at_hour && visit > (time_at_hour - 60*60*1000) // inclusive of the given hour
                        ).length;
                    }
                } else {
                    // If no attribute is provided, count all views
                    hour_count += user_visits.filter(visit => 
                        visit <= time_at_hour && visit > (time_at_hour - 60*60*1000) // inclusive of the given hour
                    ).length;
                }
            }

            total_views += hour_count;
            let moving_average = 0;
            if (hour < 6) {
                // Average of the hours up until now (e.g. if you're at hour 2, you'll have 3 hours worth of data: 0,1,2)
                moving_average = total_views / (hour + 1);
            } else {
                // If your duration is > 6, calculate a true rolling average
                moving_average = total_views / 6;
            }
            
            // Push the time and avg as a pair
            time_pairs.push([time_at_hour, moving_average]);
        }

        return time_pairs;
    }


    // Function to find the best predictor when booking a demo
    find_best_predictor() {
        const results = {};

        // iterate through every user        
        for (const user_id in this.user_data) {
            const user = this.user_data[user_id];
            // loop through all users' attrs and add to count and true score in results obj
            for (const attr in user.attrs) {
                if (!results[attr]) {
                    results[attr] = { count: 0, true_score: 0 };
                }
                results[attr].count++;
                // if user booked a demo AND attr is true, increment true_score
                if (user.demo_booked && user.attrs[attr] == true) {
                    results[attr].true_score++
                }
            }
        }

        let best_predictor = 'none found yet';
        let best_probability = 0;

        for (const attr in results) {
            const probability = results[attr].true_score / results[attr].count;

            if (probability > best_probability) {
                best_predictor = attr;
                best_probability = probability;
            }
        }

        return [best_predictor, best_probability];
    }
}

// let's test!

const tracker = new VisitAndDemoTracker();

// Track user views
tracker.track_view(1, tracker.user_data[1].attrs);
tracker.track_view(2, tracker.user_data[2].attrs);
tracker.track_view(3, tracker.user_data[3].attrs);
tracker.track_view(4, tracker.user_data[3].attrs);
tracker.track_view(5, tracker.user_data[3].attrs);

// Run demo bookings
tracker.track_book_demo(1);
tracker.track_book_demo(3);
tracker.track_book_demo(5);

// Test find_best_predictor
const best_predictor = tracker.find_best_predictor();
console.log("Best predictor for booking a demo: ", best_predictor);
// console.log(tracker.get_views_last_24hr())

// future:
// combining attributes (multi-variable regression models, decision trees, random forests, etc.)
// handle ties
// could calculate the probability of booking a demo regardless of attributes
// data storage/persistence
// track when demo was booked? For simplicity, I'll assume no, though it could be useful to track if users return to the site after booking a demo, especially if users commonly no-show demos
// post-demo-booking behavior
// user journey mapping
// data privacy?

// current problems:
// 0 count will result in NaN when calculating probability
// empty this.user_data. could introduce an early return with default data
// users missing some attributes (e.g. blocking location sharing)
// attrs aren't booleans (or are null). need type checking or default data
// a user books demo but all attrs are false
// biased data due to low data volume
// 0.5 probability doesn't seem helpful
// changing attrs not currently accounted for