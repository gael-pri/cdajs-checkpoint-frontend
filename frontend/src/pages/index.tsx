import { gql, useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import { useState } from 'react';

const GET_COUNTRIES = gql`
  query Countries {
    countries {
      id
      code
      name
      emoji
      continent {
        id
        name
      }
    }
  }
`;

// Mutation pour ajouter un pays
const ADD_COUNTRY = gql`
  mutation AddCountry($name: String!, $code: String!, $emoji: String!) {
    addCountry(data: { name: $name, code: $code, emoji: $emoji }) {
      id
      name
      code
      emoji
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [addCountry] = useMutation(ADD_COUNTRY);

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [emoji, setEmoji] = useState('');

  const [successMessage, setSuccessMessage] = useState('');

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

    // Fonction pour soumettre le formulaire
  const handleAddCountry = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCountry({
        variables: {
          name,
          code,
          emoji,
        },
        refetchQueries: [{ query: GET_COUNTRIES }], // Recharger la liste des pays après l'ajout
      });
      setSuccessMessage('Le pays a été ajouté avec succès !');
      setName('');
      setCode('');
      setEmoji('');
    } catch (err) {
      setSuccessMessage('Une erreur est survenue lors de l\'ajout du pays.');
    }
  };

  return (
    <>
      <div id="header">
        <h1>Checkpoint : frontend</h1>
        <h3>Countries</h3>
      </div>

      <div id="page">

      <div id="countryForm">
          <form onSubmit={handleAddCountry}>
            <div>
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="code">Code</label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="emoji">Emoji</label>
              <input
                type="text"
                id="emoji"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                required
              />
            </div>

            <button type="submit">Add</button>
          </form>

          {successMessage && <p>{successMessage}</p>}
        </div>

        <div id="allCountries">
        {data.countries.map((country: { id: string; name: string; code: string; emoji: string }) => (
          <Link href={`/country/${country.code}`} key={country.id}>
            <div className="countryCard" key={country.id}>
              <h4>{country.name}</h4> 
              {country.emoji}
            </div>
          </Link>
        ))}
          
        </div>
      </div>
    </>
  );
}