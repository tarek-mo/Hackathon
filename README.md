# Hackathon

PhishGuard est un outil de détection de hameçonnage (phishing) construit avec Next.js/FLask/Supabase.

## Fonctionnalités

- Vérifier si une URL est un site de hameçonnage
- Vérifier si un e-mail est un hameçonnage
- Afficher les statistiques des vérifications récentes
- Afficher un tableau des URLs/e-mails récemment vérifiés

## Prérequis

- Node.js (version 12 ou supérieure)
- Python
- Un compte Supabase et un projet Supabase configuré

## Installation

1. Clonez le dépôt GitHub :

Voici le contenu à copier pour la documentation [README.md](http://readme.md/) au format PDF :

markdown
# PhishGuard

PhishGuard est un outil de détection de hameçonnage (phishing) construit avec Next.js et Supabase.

## Fonctionnalités

- Vérifier si une URL est un site de hameçonnage
- Vérifier si un e-mail est un hameçonnage
- Afficher les statistiques des vérifications récentes
- Afficher un tableau des URLs/e-mails récemment vérifiés

## Prérequis

- Node.js (version 12 ou supérieure)
- Un compte Supabase et un projet Supabase configuré

## Installation

1. Clonez le dépôt GitHub :



git clone https://github.com/votrecompte/phishguard.git



2. Installez les dépendances :



npm install



3. Créez un fichier `.env.local` à la racine du projet et ajoutez les variables d'environnement suivantes avec vos informations Supabase :



NEXT_PUBLIC_SUPABASE_URL=<votre-url-supabase>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<votre-clé-anonyme-supabase>



## Démarrage

Pour démarrer l'application en mode développement, exécutez :



npm run dev



Puis, ouvrez [<http://localhost:3000>](<http://localhost:3000>) dans votre navigateur pour voir l'application.

## Déploiement

Pour déployer l'application, vous pouvez utiliser un service comme Vercel ou Netlify. Assurez-vous de configurer les variables d'environnement pour votre projet de production.

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

Ce projet est sous licence MIT.



Vous pouvez copier ce contenu et le coller dans un éditeur de texte ou un outil de traitement de texte pour générer un fichier PDF. Assurez-vous de remplacer <votre-url-supabase> et <votre-clé-anonyme-supabase> par vos propres informations Supabase avant de générer le PDF.
