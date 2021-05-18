-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 18 Maj 2021, 16:23
-- Wersja serwera: 10.4.17-MariaDB
-- Wersja PHP: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `bd2_s14`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `payouts`
--

CREATE TABLE `payouts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `salary` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `prices`
--

CREATE TABLE `prices` (
  `id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `price` decimal(7,2) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `registry`
--

CREATE TABLE `registry` (
  `id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `user` int(11) NOT NULL,
  `plate_number` varchar(8) NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `registry-resources`
--

CREATE TABLE `registry-resources` (
  `id` int(11) NOT NULL,
  `registry_id` int(11) NOT NULL,
  `resource_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `registry-services`
--

CREATE TABLE `registry-services` (
  `id` int(11) NOT NULL,
  `registry_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `resources`
--

CREATE TABLE `resources` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `brand` varchar(64) NOT NULL,
  `model` varchar(64) NOT NULL,
  `quantity` float NOT NULL,
  `unit` varchar(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `parent` int(11) DEFAULT NULL,
  `name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `username` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `role` varchar(16) NOT NULL,
  `first_name` varchar(32) NOT NULL,
  `last_name` varchar(32) NOT NULL,
  `salary` decimal(6,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `active`, `username`, `password`, `role`, `first_name`, `last_name`, `salary`) VALUES
(1, 1, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'admin', '', '', '0.00');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `payouts`
--
ALTER TABLE `payouts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `prices`
--
ALTER TABLE `prices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_id` (`service_id`);

--
-- Indeksy dla tabeli `registry`
--
ALTER TABLE `registry`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user`);

--
-- Indeksy dla tabeli `registry-resources`
--
ALTER TABLE `registry-resources`
  ADD PRIMARY KEY (`id`),
  ADD KEY `registry_id` (`registry_id`),
  ADD KEY `resource_id` (`resource_id`);

--
-- Indeksy dla tabeli `registry-services`
--
ALTER TABLE `registry-services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `registry_id` (`registry_id`),
  ADD KEY `service_id` (`service_id`);

--
-- Indeksy dla tabeli `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `payouts`
--
ALTER TABLE `payouts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `prices`
--
ALTER TABLE `prices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `registry`
--
ALTER TABLE `registry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `registry-resources`
--
ALTER TABLE `registry-resources`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `registry-services`
--
ALTER TABLE `registry-services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `resources`
--
ALTER TABLE `resources`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `payouts`
--
ALTER TABLE `payouts`
  ADD CONSTRAINT `payouts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ograniczenia dla tabeli `prices`
--
ALTER TABLE `prices`
  ADD CONSTRAINT `prices_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`);

--
-- Ograniczenia dla tabeli `registry`
--
ALTER TABLE `registry`
  ADD CONSTRAINT `registry_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`);

--
-- Ograniczenia dla tabeli `registry-resources`
--
ALTER TABLE `registry-resources`
  ADD CONSTRAINT `registry-resources_ibfk_1` FOREIGN KEY (`registry_id`) REFERENCES `registry` (`id`),
  ADD CONSTRAINT `registry-resources_ibfk_2` FOREIGN KEY (`resource_id`) REFERENCES `resources` (`id`);

--
-- Ograniczenia dla tabeli `registry-services`
--
ALTER TABLE `registry-services`
  ADD CONSTRAINT `registry-services_ibfk_1` FOREIGN KEY (`registry_id`) REFERENCES `registry` (`id`),
  ADD CONSTRAINT `registry-services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
