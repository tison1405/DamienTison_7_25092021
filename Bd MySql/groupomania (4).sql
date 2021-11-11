-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 22 oct. 2021 à 10:31
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
-- Structure de la table `forummulti`
--

DROP TABLE IF EXISTS `forummulti`;
CREATE TABLE IF NOT EXISTS `forummulti` (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `users_id` smallint(6) UNSIGNED NOT NULL,
  `commentaire` text,
  `publication` tinyint(1) NOT NULL,
  `like` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key_users_id` (`id`) USING BTREE,
  KEY `fk_users_id` (`users_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `forummulti`
--

INSERT INTO `forummulti` (`id`, `date`, `users_id`, `commentaire`, `publication`, `like`) VALUES
(1, '2021-09-28 22:00:00', 3, 'la vie est belle', 0, 0),
(2, '2021-10-15 12:22:56', 3, 'gagner', 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `userlike`
--

DROP TABLE IF EXISTS `userlike`;
CREATE TABLE IF NOT EXISTS `userlike` (
  `userId` smallint(6) NOT NULL,
  `postId` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom` varchar(40) NOT NULL,
  `prenom` varchar(40) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `photo` varchar(100) DEFAULT NULL,
  `modérateur` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mail` (`mail`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `nom`, `prenom`, `mail`, `password`, `photo`, `modérateur`) VALUES
(3, 'tison', 'damien', 'tison1405@gmail.com', 'Come0801', '', 0),
(4, 'tison', 'sandrine', 'sandrine@gmail.com', 'sandrine1201', '', 0),
(6, 'tison', 'come', 'come@gmail.com', 'come080110', NULL, 0),
(7, 'tison', 'alex', 'alex@gmail.com', 'alex1010', NULL, 0),
(8, 'tison', 'damien', 'daq3Bo4zf7tAn3nkCWmUbYpJQFLuZX0C7KQ4hEsTWds=', '$2b$10$Z9mApAtQlVOmUgEr1Qvg/e/VJZM3GHFkJfmO/kvSWdqRwdUY5X202', NULL, 0),
(9, 'tison', 'damien', 'Me7Znmqd4h7Jd7q55Gd7RC3QZe7boe7DO8QNblNpjB4=', '$2b$10$EbI.o3bf4gNicDRvsuNuTOUfGJXn/SBbUmT/9ac3IGVqV30vNvg4S', NULL, 0),
(10, 'tison', 'damien', 'x+A0ULSdues70xoggT4rXOOE/PVUW/rXker50tKDlxo=', '$2b$10$35WtxUgriWekHeK3oVjPjucZYGA2WpCyfDt9EjvL9zPGsmkTNaeTq', NULL, 0),
(12, 'tison', 'damien', 'WbL5SBYSZteltmhzgVHxsx7DH7pPL0SV0zDEGvdWSK4=', '$2b$10$qmuHfZFjZbJ3JpksKfRJEuFTL.JUtI7Z.0e4v68AQir.PPZ2qjpKK', NULL, 0),
(13, 'tison', 'damien', 'gT6hU5KioLrV2/LQlpujKSzynXEopdBQvopRWyePIkM=', '$2b$10$w7A1AOSCIxksDXhurxnUp.Ngk8git7I0pz5eBXl3m21x4J3T8pr4u', NULL, 0),
(14, 'tison', 'damien', 'z6CpepM5QrxpzAVP9xylz5cZcpYU1on6hl7f64G5NLU=', '$2b$10$3yVlZrXffeRXcYm6uighbeENHUIi1fur1shm3JnAlcEkhvNpb2mxq', NULL, 0),
(15, 'tison', 'damien', 'BokLAD0wuMKqRNo8w52h3PMEYrF3gPAL3IjU/MPx8xo=', '$2b$10$z4OymGNcVqDH.brH7ypH.uuORdV9KLtk56EG1EeduRaDI5czG51du', NULL, 0),
(16, 'tison', 'damien', 'LnfK3f3EPKzaGdGqTAn/3g==', '$2b$10$zto.cW6MIumfdgyLNWz0Z.pMWhp7KabHv75BrH4sBeyvn7mAtMHPq', NULL, 0),
(17, 'tison', 'joelle', 'qFMVTZZmR+kFuPsaNhEkQFBI8dlKCbVnkwj5OCFZ35I=', '$2b$10$1OL46YLc7pNSJppMC/r8POhlPZD54u97Eyr/jg/ehneR.sWsXFnrK', 'http://localhost:3000/images/100_0392.JPG1634501287945.jpg', 0),
(18, 'beren', 'dada', 'CfF+mjhBMgUsVox7mKWuBemkUv5vtdWHhx79nosJgwo=', '$2b$10$DL8/c7imPx4gK5eRvtEj7ek/xt8ViHS3NzMOifpKGeGWDKVt8XZBK', NULL, 0),
(20, 'gegegeg', 'dada', 'QYbZ33FoAUszFSdAH2GJ+F8T8xOfRe4UjBSp1eDAtqA=', '$2b$10$3Fobj/nyHTQXbF4UQs5zjuJ3MsHGs/u9CQOPtWadZvH0SBeMyOy02', NULL, 0),
(21, 'wilili', 'jjjjjjj', 'eXEkx264o6EOOU9oCgUaxRRYK+r7sQ+P2F6ol6A1hj0=', '$2b$10$Rw5.ERqhUQB3Yv6vNl8D/.jXzRyERpeLMqVabIBimYzFCm5WFGxna', NULL, 0),
(22, 'tison', 'damien', 'M0H/cLhd9j1bLmt8DDr2qA==', '$2b$10$.8OeBNY1kQ6xB6wWYJOu4eEB4vQdjeDJ6N15vbYEX0vr9v/64geES', NULL, 0),
(23, 'tison', 'damien', 'mYzh3kENznqImJQzhcnhxPQFO+8Si5z44q/Z7EsHctQ=', '$2b$10$oJ8dYATXzrOFRFihjiT.l.tHdo3X/cm5l3LOXmfu9DBd0Y9sJQ48.', NULL, 0),
(24, 'tison', 'damien', '[object Object]', '$2b$10$rBQ6KegmFa0R8vC2BJpgqetzNDT29JrTu.eG5pn5gJZ073MCHjdIa', NULL, 0),
(25, 'tison', 'damien', '5c0171bbd9cad97c849eedeefa6889ee042b4d85a2e30fc89357b119f6b2b200', '$2b$10$8xB6UymcXLaCBPkpLm.bNueF40sL5eohmQImy8coEFGgT4TBQc7eO', NULL, 0),
(26, 'tison', 'damien', '1dd55fe42d962401d10e0b2a0f77839ced2aaaeaa81f7736db66cc44b404d3ee', '$2b$10$bHDdtOrIXIDmjn0ByMQfBO3.DejBacP3bFKaOEJ2WoojterNFANYq', NULL, 0),
(27, 'tison', 'damien', '7d4395791477525035adc74c03bd43562cd923fccd0c695c367a3ab52044b229', '$2b$10$ists9TVdVR/iNR2waQrPKu2HIri2dVyEAo9EvCysBjl0aGXy0/CoS', NULL, 0),
(28, 'tison', 'damien', '30ee5c77a3e3679fdd27ddbf7105bb9a60bb265656746d94fd96a2805fe88746', '$2b$10$w6u.qhqebd6Led4D7foS2ufQ42Ou126k/1k6FBI0E0QtjvuxIEo9O', NULL, 0),
(29, 'tison', 'damien', '9zV7AlAFKodAMirWXZZVbw5KWPnrnhYBjcVPoSH2yCA=', '$2b$10$Kc7u1VRk0EPwYWeHriXPTujOQdQBvgeiafBZ53VLNKUDbSdmZa4iu', NULL, 0),
(30, 'tison', 'damien', 'DPKapjqKj77Y16jNerKD7PGysa8CA9g4UOlM0UGhtW0=', '$2b$10$urMzUQgJAe5KWWGDWq5S.e6y4yxNRApLdICflVfhyjC6DZ8Cf3Zvm', NULL, 0),
(31, 'tison', 'damien', 'kTNERSaqh9igcr1ClhmiOiOCOCO4DnuT5NGrEWvnq7g=', '$2b$10$4gT.CgASI9eDMZJrC.6XMOgjpYgll.CoTWWZdHsIqQZ4kwmkGaVPq', 'http://localhost:3000/images/100_0400.JPG1634636509911.jpg', 0),
(32, 'justine', 'justine', 'Mq8p8szzOeSm0pA2+tEPWnMFENZqDnLafMXTKrWzRqE=', '$2b$10$i2oPcauQq9bL8RoVQWkPr.OoQ.UxVcm2sBkD4jD0E61dSh17XijlK', 'http://localhost:3000/images/IMG_4003.JPG1634637480026.jpg', 0);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `forummulti`
--
ALTER TABLE `forummulti`
  ADD CONSTRAINT `fk_users_id` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
