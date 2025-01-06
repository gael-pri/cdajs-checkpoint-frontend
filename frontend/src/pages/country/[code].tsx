import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const GET_COUNTRY_DETAILS = gql`
query CountryDetails($code: String!) {
  country(code: $code) {
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

export default function CountryPage() {
  const router = useRouter();
  const { code } = router.query;
  console.log('Code from URL:', code);

  const { loading, error, data } = useQuery(GET_COUNTRY_DETAILS, {
    variables: { code },
    skip: !code,
  });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;
  console.log(data);
  const country = data?.country;

  return (
    <>
        <div id="header">
            <h1>Checkpoint : frontend</h1>
            <h3>Countries</h3>
        </div>
        <div id="page">
            <div id="allCountries">
                <div className="countryCard" key={country?.id}>
                    <h1>{country?.emoji}</h1>
                    <p>Name : {country?.name} [{country?.code}]</p>
                    <p>Continent : {country?.continent.name}</p>
                </div>
            </div>
        </div>
    </>

  );
}
