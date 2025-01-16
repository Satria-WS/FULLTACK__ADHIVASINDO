import db from '../config/db';
import dotenv from 'dotenv';

dotenv.config();


const seedContentTable = async () => {
  const dummyData = [
    {
      title: 'First Content',
      description: 'This is the first content description',
      user_id: 1,
    },
    // {
    //   title: 'Second Content',
    //   description: 'This is the second content description',
    //   user_id: 2,
    // },
    // {
    //   title: 'Third Content',
    //   description: 'This is the third content description',
    //   user_id: 3,
    // },
  ];
  try {
    for (const data of dummyData) {
      await db
        .promise()
        .query(
          'INSERT INTO content (title, description, user_id) VALUES (?, ?, ?)',
          [data.title, data.description, data.user_id]
        );
    }
    console.log('Dummy data inserted into content table');
  } catch (err: any) {
    console.error('Error inserting dummy data:', err.message);
  } finally {
    db.end();
  }
};

seedContentTable();