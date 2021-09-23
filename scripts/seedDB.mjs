import mongoose from 'mongoose';

import Customer from '../models/customer.mjs';
import Job from '../models/job.mjs';
import Part from '../models/part.mjs';

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/metronicsDB")
    .then(() => console.log("Connection to database successful."))
    .catch(err => console.log("Failed to connect to database." + "\n" + `Error: ${err.message}`));

const customerSeed = [
    {
        "_id": 1,
        "business_name": "Elk Grove Automotive",
        "contact_name": "Mike",
        "phone": "(916) 234-5467",
        "street_1": "12 S Peabody Ln",
        "street_2": "",
        "city": "Elk Grove",
        "state": "CA",
        "zipcode": "95757",
        "jobs": [3,4]
    },
    {
        "_id": 2,
        "business_name": "Jackson Auto",
        "contact_name": "Jerry or Dave",
        "phone": "(916) 456-1234",
        "street_1": "5824 Stockton Blvd",
        "street_2": "Unit 4",
        "city": "Sacramento",
        "state": "CA",
        "zipcode": "95867",
        "jobs": [5,6]
    },
];

const jobSeed = [
    {
        "_id": 3,
        "customer_id": 1,
        "date_completed": new Date('June 23, 2020 00:00:00'),
        "invoice_number": "11694",
        "issue_notes": "fails to complete recovery cycle",
        "repair_notes": "replaced recover solenoid and couplers",
        "status": "complete",
        "type": "repair",
        "parts": [7,9]
    },
    {
        "_id": 4,
        "customer_id": 1,
        "date_completed": "",
        "invoice_number": "",
        "issue_notes": "unit needs maintenance",
        "repair_notes": "",
        "status": "scheduled",
        "type": "maintenance",
        "parts": []
    },
    {
        "_id": 5,
        "customer_id": 2,
        "date_completed": new Date('June 30, 2020 00:00:00'),
        "invoice_number": "11702",
        "issue_notes": "high pressure error",
        "repair_notes": "replaced leaky filter",
        "status": "complete",
        "type": "repair",
        "parts": [8]
    },
    {
        "_id": 6,
        "customer_id": 2,
        "date_completed": "",
        "invoice_number": "",
        "issue_notes": "same problem as last time",
        "repair_notes": "",
        "status": "waiting",
        "type": "unknown",
        "parts": []
    }
];

const partSeed = [
    {
        "_id": 7,
        "part_number": "RA17234",
        "description": "12v solenoid",
        "purchase_price": 24.99,
        "sale_price": 75.00,
        "stock": 12
    },
    {
        "_id": 8,
        "part_number": "RA87453",
        "description": "filter-drier",
        "purchase_price": 39.99,
        "sale_price": 85.00,
        "stock": 5
    },
    {
        "_id": 9,
        "part_number": "RA11123",
        "description": "replacement coupler set",
        "purchase_price": 42.49,
        "sale_price": 90.00,
        "stock": 2
    }
];

Customer.remove({})
    .then(() => Customer.collection.insertMany(customerSeed))
    .then(() => {
        console.log("Customer seed records inserted.")
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

Job.remove({})
    .then(() => Job.collection.insertMany(jobSeed))
    .then(() => {
        console.log("Job seed records inserted.")
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

Part.remove({})
    .then(() => Part.collection.insertMany(partSeed))
    .then(() => {
        console.log("Inventory seed records inserted.")
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });