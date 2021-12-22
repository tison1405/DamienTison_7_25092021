-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 22 déc. 2021 à 12:53
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `like_post`
--

DROP TABLE IF EXISTS `like_post`;
CREATE TABLE IF NOT EXISTS `like_post` (
  `id` mediumint(6) NOT NULL,
  `user_like` smallint(6) NOT NULL,
  `id_post` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codeIdUser` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `like_post`
--

INSERT INTO `like_post` (`id`, `user_like`, `id_post`) VALUES
(48135, 48, 135),
(48136, 48, 136),
(55134, 55, 134);

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `users_id` smallint(6) UNSIGNED NOT NULL,
  `post` mediumtext COLLATE utf8mb4_bin,
  `post_filename` varchar(100) COLLATE utf8mb4_bin DEFAULT NULL,
  `post_file` varchar(100) COLLATE utf8mb4_bin DEFAULT NULL,
  `report` tinyint(1) NOT NULL,
  `number_like` smallint(6) NOT NULL,
  `last_remark` text COLLATE utf8mb4_bin,
  `last_remark_name` varchar(40) COLLATE utf8mb4_bin DEFAULT NULL,
  `last_remark_firstname` varchar(40) COLLATE utf8mb4_bin DEFAULT NULL,
  `last_remark_picture` varchar(100) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key_users_id` (`id`) USING BTREE,
  KEY `fk_users_id` (`users_id`)
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `date`, `users_id`, `post`, `post_filename`, `post_file`, `report`, `number_like`, `last_remark`, `last_remark_name`, `last_remark_firstname`, `last_remark_picture`) VALUES
(133, '2021-12-16 08:55:11', 48, 'coucou', 'Declaration_automatique_des_revenus_2020.pdf', 'http://localhost:3000/images/Declaration_automatique_des_revenus_2020.pdf1639644911664.pdf', 0, 0, 'oui', 'tison', 'damien', 'http://localhost:3000/images/IMG_20200906_141404.jpg1639640856454.jpg'),
(134, '2021-12-16 12:28:23', 55, 'Votre post a été moderé', NULL, NULL, 2, 1, 'un autre\nsqdff', 'Bourrée', 'Charles', 'http://localhost:3000/images/IMG_20200809_121907.jpg1639657660610.jpg'),
(135, '2021-12-16 12:29:56', 55, 'tetqsr', 'photo id come.pdf', 'http://localhost:3000/images/photo_id_come.pdf1639657796108.pdf', 0, 1, NULL, NULL, NULL, NULL),
(136, '2021-12-22 09:51:57', 48, 'on est mexique', NULL, NULL, 0, 1, 'yes', 'tison', 'damien', 'http://localhost:3000/images/IMG_20200809_121907.jpg1639645196266.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `remarks`
--

DROP TABLE IF EXISTS `remarks`;
CREATE TABLE IF NOT EXISTS `remarks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_remark` text,
  `post_id` smallint(6) UNSIGNED DEFAULT NULL,
  `user_id` smallint(6) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=208 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `remarks`
--

INSERT INTO `remarks` (`id`, `post_remark`, `post_id`, `user_id`) VALUES
(200, 'damien?', 133, 48),
(201, '', 133, 48),
(202, 'oui', 133, 48),
(205, 'cool', 136, 48),
(206, 'oui', 136, 48),
(207, 'yes', 136, 48);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `firstname` varchar(40) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `picture` varchar(100) DEFAULT NULL,
  `moderator` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mail` (`mail`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `firstname`, `mail`, `password`, `picture`, `moderator`) VALUES
(48, 'tison', 'damien', '2b8dxjmm50H0+UHEuMfAm7+VsNb/XLh8jZRb+6YYYu0=', '$2b$10$W4kR/0MmjkvXXxcbFBKoAepZOtIUe8TkWYY/2Su7D5unY3Tv7XESq', 'http://localhost:3000/images/IMG_20200809_121907.jpg1639645196266.jpg', 1),
(55, 'Utilisateur desactivé', 'Utilisateur desactivé', 'T3mH2sSZGzfH2lZ8N5QAnIknhrpeZJsz828fnKR1aMk=', 'Utilisateur desactivé', 'Utilisateur desactivé', 2),
(56, 'moury', 'alain', '6aQ2fKKEtvD3ZWA4MJktbw==', '$2b$10$LjxCVR/oi2XKfb1twKoeCulyMk0nmMjHcAUDO63uMaFj/qPl.sdZ2', 'http://localhost:3000/images/inconnu.png1638272875922.png', 0),
(57, 'goumand', 'marine', 'GpL4S6BXL7cFcJwWlqdIyqvy2XKCfU7LBZiLVVOSHSg=', '$2b$10$bJCSDibwipXXx31OQhUetuxKiocuCNjKzpXgtGpjyov0Ug0q8H/0O', 'http://localhost:3000/images/inconnu.png1638272875922.png', 0);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_users_id` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `remarks`
--
ALTER TABLE `remarks`
  ADD CONSTRAINT `fk_postId_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
