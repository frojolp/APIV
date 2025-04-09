import axios from "axios";
import React from "react";

export type User = {
  userid: string;
  vorname: string;
  nachname: string;
  geburtstag: Date;
  telefonnummer: number;
  email: string;
};

export type NewUser = {
  vorname: string;
  nachname: string;
  geburtstag: Date;
  telefonnummer: number;
  email: string;
}

type userGenerationAPI = {
  createUser: (newUser: NewUser) => void;
  fetchUser: () => void;
  users: User[];
};

export default function useUserGenerationAPI(): userGenerationAPI {
  const [users, setUsers] = React.useState<User[]>([]);

   const fetchUser = React.useCallback(() => {
        return axios
          .get("/api/user")
          .then((response) => setUsers(response.data));
      }, []);

    const createUser = React.useCallback((newUser: NewUser) => {
        axios.post('/api/user', newUser)
    }, [])

      return{
        createUser,
        fetchUser,
        users
      }
}
