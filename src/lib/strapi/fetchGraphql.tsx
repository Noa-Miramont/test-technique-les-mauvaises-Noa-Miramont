/**
 * @fileoverview GraphQL Client pour l'API Strapi
 *
 * Ce module fournit une interface centralisée pour communiquer avec l'API GraphQL
 * de Strapi. Il gère l'authentification, les erreurs et la validation des réponses.
 *
 * @author Agence Les Mauvaises
 * @version 1.0.0
 * @since 2025
 */

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_STRAPI_API_URL
  ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`
  : 'https://credible-nest-8d656db1f4.strapiapp.com/graphql';

const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

/**
 * Interface pour les erreurs GraphQL
 */
interface GraphQLError {
  message: string;
  locations?: Array<{ line: number; column: number }>;
  path?: string[];
  extensions?: Record<string, any>;
}

/**
 * Interface pour la réponse GraphQL
 */
interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

/**
 * Exécute une requête GraphQL vers l'API Strapi
 *
 * Cette fonction gère automatiquement :
 * - L'authentification via le token Strapi
 * - La validation des réponses
 * - La gestion des erreurs
 * - Le cache des requêtes
 *
 * @template T - Type de données attendu dans la réponse
 * @param query - Requête GraphQL à exécuter
 * @param variables - Variables à passer à la requête
 * @param operationName - Nom de l'opération pour le debugging
 * @returns Promise<T | null> - Données de la réponse ou null en cas d'erreur
 *
 * @example
 * ```typescript
 * const data = await fetchGraphQL<AppartementsResponse>(
 *   appartements_query,
 *   { limit: 10 },
 *   "GetAppartements"
 * );
 * ```
 *
 * @throws {Error} Si la requête échoue ou si les données sont invalides
 */
export async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T | null> {
  try {
    // Configuration des headers de la requête
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Ajout du token d'authentification si disponible
    if (STRAPI_API_TOKEN) {
      headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
    }

    // Exécution de la requête GraphQL
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 10 }, // Cache pendant 10 secondes
      mode: 'cors',
    });

    // Vérification du statut HTTP
    if (!response.ok) {
      throw new Error(`GraphQL API Error: ${response.status} ${response.statusText}`);
    }

    // Parsing de la réponse JSON
    const json: GraphQLResponse<T> = await response.json();

    // Vérification des erreurs GraphQL
    if (json.errors && json.errors.length > 0) {
      const errorMessages = json.errors.map((error) => error.message).join(', ');

      throw new Error(`GraphQL Errors: ${errorMessages}`);
    }

    // Vérification de la présence des données
    if (!json.data) {
      throw new Error('Missing data in GraphQL response');
    }

    return json.data as T;
  } catch (error) {
    // Afficher l'erreur pour le debugging
    console.error(' Erreur fetchGraphQL:', error);
    throw error; // Re-lancer l'erreur pour qu'elle soit gérée par le hook
  }
}
