import { useState, useEffect } from 'react';
import { dbPromise } from '../db/db';
import seedData from '../db/seed.json';

export interface Conference {
  id: number;
  title: string;
  speaker: string;
  description: string;
  image: string;
  start_time: string;
  end_time: string;
  venue_name: string;
  latitude: number;
  longitude: number;
}

export function useConferences() {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function setupDatabase() {
      try {
        const db = await dbPromise;

        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS conferences (
            id INTEGER PRIMARY KEY NOT NULL, 
            title TEXT NOT NULL, 
            speaker TEXT NOT NULL, 
            description TEXT, 
            image TEXT, 
            start_time TEXT, 
            end_time TEXT, 
            venue_name TEXT NOT NULL, 
            latitude REAL NOT NULL, 
            longitude REAL NOT NULL
          );
        `);

        const firstRow = await db.getFirstAsync<{ id: number }>('SELECT id FROM conferences');

        if (firstRow === null) {
          for (const conf of seedData) {
            await db.runAsync(
              'INSERT INTO conferences (id, title, speaker, description, image, start_time, end_time, venue_name, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
              conf.id, conf.title, conf.speaker, conf.description, conf.image, conf.start_time, conf.end_time, conf.venue_name, conf.latitude, conf.longitude
            );
          }
        }

        const allRows = await db.getAllAsync<Conference>('SELECT * FROM conferences ORDER BY start_time ASC');
        setConferences(allRows);

      } catch (error) {
        console.error('Error en la configuración de la base de datos', error);
      } finally {
        setLoading(false);
      }
    }

    setupDatabase();
  }, []);

  const getConferenceById = async (id: number): Promise<Conference | null> => {
    const db = await dbPromise;
    const conference = await db.getFirstAsync<Conference>('SELECT * FROM conferences WHERE id = ?', id);
    return conference;
  };

  return { conferences, loading, getConferenceById };
}