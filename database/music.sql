-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Waktu pembuatan: 22 Jun 2023 pada 02.57
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `music`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `album`
--

CREATE TABLE `album` (
  `id_album` char(4) NOT NULL,
  `nama_album` varchar(50) NOT NULL,
  `path_album` varchar(50) NOT NULL,
  `id_artis` char(4) NOT NULL,
  `tahun_rilis` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `album`
--

INSERT INTO `album` (`id_album`, `nama_album`, `path_album`, `id_artis`, `tahun_rilis`) VALUES
('ALB1', '(Whats the Story) Mo', '', 'ART1', '1995-08-02'),
('ALB2', 'Parachutes', '', 'ART2', '2000-07-10'),
('ALB3', 'ALEXANDRIA', '', 'ART3', '0000-00-00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `artis`
--

CREATE TABLE `artis` (
  `id_artis` char(4) NOT NULL,
  `nama_artis` varchar(20) NOT NULL,
  `id_genre` char(4) NOT NULL,
  `id_album` char(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `artis`
--

INSERT INTO `artis` (`id_artis`, `nama_artis`, `id_genre`, `id_album`) VALUES
('1234', 'bandjoel', 'GNR1', 'ALB1'),
('ART1', 'Oasis', 'GNR1', 'ALB1'),
('ART2', 'Coldplay', 'GNR1', 'ALB2'),
('ART3', 'NOAH', 'GNR1', 'ALB1');

-- --------------------------------------------------------

--
-- Struktur dari tabel `genre`
--

CREATE TABLE `genre` (
  `id_genre` char(4) NOT NULL,
  `nama_genre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `genre`
--

INSERT INTO `genre` (`id_genre`, `nama_genre`) VALUES
('GNR1', 'Rock Alternative');

-- --------------------------------------------------------

--
-- Struktur dari tabel `lagu`
--

CREATE TABLE `lagu` (
  `id_lagu` int(11) NOT NULL,
  `judul_lagu` varchar(30) NOT NULL,
  `path` varchar(50) NOT NULL,
  `id_artis` char(4) NOT NULL,
  `lirik` text NOT NULL,
  `id_album` char(4) DEFAULT NULL,
  `single` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `lagu`
--

INSERT INTO `lagu` (`id_lagu`, `judul_lagu`, `path`, `id_artis`, `lirik`, `id_album`, `single`) VALUES
(13, 'Coldplay - Yellow', 'Coldplay-yellow', 'ART2', '', 'ALB2', 0),
(14, 'Oasis - Champagne_supernova', 'Oasis-champagne_supernova.mp3', 'ART1', 'How many special people change?\nHow many lives are livin strange?\nWhere were you while we were getting high?\nSlowly walkin down the hall\nFaster than a cannonball\nWhere were you while we were getting high?\nSomeday you will find me\nCaught beneath the landslide\nIn a champagne supernova in the sky\nSomeday you will find me\nCaught beneath the landslide\nIn a champagne supernova\nA champagne supernova in the sky\nWake up the dawn and ask her why\nA dreamer dreams she never dies\nWipe that tear away now from your eye\nSlowly walkin down the hall\nFaster than a cannonball\nWhere were you while we were getting high?\nSomeday you will find me\nCaught beneath the landslide\nIn a champagne supernova in the sky\nSomeday you will find me\nCaught beneath the landslide\nIn a champagne supernova\nA champagne supernova\nCause people believe\nThat theyre gonna get away for the summer\nBut you and I, we live and die\nThe worlds still spinnin round, we dont know why\nWhy, why, why, why\nHow many special people change?\nHow many lives are livin strange?\nWhere were you while we were getting high?\nSlowly walkin down the hall\nFaster than a cannonball\nWhere were you while we were getting high?\nSomeday you will find me\nCaught beneath the landslide\nIn a champagne supernova in the sky\nSomeday you will find me\nCaught beneath the landslide\nIn a champagne supernova\nA champagne supernova\nCause people believe\nThat they are gonna get away for the summer\nBut you and I, we live and die\nThe worlds still spinnin round, we dont know why\nWhy, why, why, why\nNa, na, na\nNa, na\nNa, na\nNa, na, na\nNa, na\nNa, na\nNa, na\nNa, na\nNa, na, na\nHow many special people change?\nHow many lives are livin strange?\nWhere were you while we were getting high?\nWe were getting high\nWe were getting high\nWe were getting high\nWe were getting high\nWe were getting high\nWe were getting high\nWe were getting high\nWe were getting high\nWe were getting high\n', 'ALB1', 0),
(15, 'Oasis - whatever', 'Oasis-whatever.mp3', 'ART1', '', 'ALB1', 0),
(16, 'Oasis - Wonderwall', 'Oasis-Wonderwall.mp3', 'ART1', '', 'ALB2', 0),
(17, 'Oasis - Stand by me', 'Oasis-stand_by_me.mp3', 'ART1', '', 'ALB2', 0),
(18, 'Oasis - Dont go away', 'Oasis-dont_go_away.mp3', 'ART1', '', 'ALB2', 0),
(19, 'MEMBEBANIKU', 'NOAH-MEMBEBANIKU_(NEW_VERSION).mp3', 'ART3', 'Tertidur lagi\r\nMasih menangis dalam sela waktu\r\nDan tanganku ini\r\nMasih memegang erat kepalaku\r\nKepalaku\r\nSemua yang membebaniku\r\nSungguh membebaniku\r\nSungguh membebaniku\r\nSungguh membebaniku\r\nLemah tetap menari langkahku\r\nMencoba tetap berdiri ku menangis\r\nMasih tetap mencari jalanku\r\nMemahami beban itu', 'ALB3', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `playlist`
--

CREATE TABLE `playlist` (
  `id_playlist` int(11) NOT NULL,
  `id_user` int(3) NOT NULL,
  `nama_playlist` varchar(20) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `playlist`
--

INSERT INTO `playlist` (`id_playlist`, `id_user`, `nama_playlist`, `description`) VALUES
(1, 1, 'favorit', 'hrhrhrh'),
(4, 1, 'playlist  baru', 'fdfdf'),
(13, 3, 'playlist khusus', ''),
(16, 1, 'nama playlist', 'aaa'),
(17, 8, 'mood', 'mantapp');

-- --------------------------------------------------------

--
-- Struktur dari tabel `playlist_lagu`
--

CREATE TABLE `playlist_lagu` (
  `id_playlist` int(3) NOT NULL,
  `id_lagu` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `playlist_lagu`
--

INSERT INTO `playlist_lagu` (`id_playlist`, `id_lagu`) VALUES
(1, 16),
(1, 18),
(4, 18),
(13, 16),
(16, 19),
(17, 19);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id_user` int(3) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `email_user` varchar(50) NOT NULL,
  `password_user` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id_user`, `user_name`, `email_user`, `password_user`) VALUES
(1, 'tsalman', 'adminqwerty@gmail.com', '12345'),
(2, 'admin', 'adminnihh@gmail.com', '12345'),
(3, 'isal', 'isalkingqwerty@gmail.com', '12345'),
(8, 'aji', 'aji@gmail.com', '12345');

-- --------------------------------------------------------

--
-- Stand-in struktur untuk tampilan `view_lagu`
-- (Lihat di bawah untuk tampilan aktual)
--
CREATE TABLE `view_lagu` (
`id_lagu` int(11)
,`judul_lagu` varchar(30)
,`path` varchar(50)
,`id_artis` char(4)
,`id_album` char(4)
,`single` tinyint(1)
);

-- --------------------------------------------------------

--
-- Struktur untuk view `view_lagu`
--
DROP TABLE IF EXISTS `view_lagu`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_lagu`  AS SELECT `lagu`.`id_lagu` AS `id_lagu`, `lagu`.`judul_lagu` AS `judul_lagu`, `lagu`.`path` AS `path`, `lagu`.`id_artis` AS `id_artis`, `lagu`.`id_album` AS `id_album`, `lagu`.`single` AS `single` FROM `lagu``lagu`  ;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `album`
--
ALTER TABLE `album`
  ADD PRIMARY KEY (`id_album`);

--
-- Indeks untuk tabel `artis`
--
ALTER TABLE `artis`
  ADD PRIMARY KEY (`id_artis`);

--
-- Indeks untuk tabel `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`id_genre`);

--
-- Indeks untuk tabel `lagu`
--
ALTER TABLE `lagu`
  ADD PRIMARY KEY (`id_lagu`);

--
-- Indeks untuk tabel `playlist`
--
ALTER TABLE `playlist`
  ADD PRIMARY KEY (`id_playlist`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `lagu`
--
ALTER TABLE `lagu`
  MODIFY `id_lagu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT untuk tabel `playlist`
--
ALTER TABLE `playlist`
  MODIFY `id_playlist` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
