-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 30, 2024 at 05:50 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tailor_tech`
--

-- --------------------------------------------------------

--
-- Table structure for table `assistants`
--

CREATE TABLE `assistants` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  `name` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assistants`
--

INSERT INTO `assistants` (`id`, `created_at`, `updated_at`, `deleted_at`, `name`) VALUES
(1, NULL, NULL, NULL, 'Ava'),
(2, NULL, NULL, NULL, 'Liam'),
(3, NULL, NULL, NULL, 'Brat'),
(4, NULL, NULL, NULL, 'Selly'),
(5, NULL, NULL, NULL, 'Trixy');

-- --------------------------------------------------------

--
-- Table structure for table `assistant_bookings`
--

CREATE TABLE `assistant_bookings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  `assistant_id` bigint(20) UNSIGNED DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `address` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bottoms`
--

CREATE TABLE `bottoms` (
  `request_id` bigint(20) UNSIGNED NOT NULL,
  `waist_to_ankle` longtext DEFAULT NULL,
  `waist` longtext DEFAULT NULL,
  `hip` longtext DEFAULT NULL,
  `ankle` longtext DEFAULT NULL,
  `thigh` longtext DEFAULT NULL,
  `knee` longtext DEFAULT NULL,
  `cuff_width` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `dresses`
--

CREATE TABLE `dresses` (
  `request_id` bigint(20) UNSIGNED NOT NULL,
  `chest` longtext DEFAULT NULL,
  `shoulder` longtext DEFAULT NULL,
  `dress_length` longtext DEFAULT NULL,
  `waist` longtext DEFAULT NULL,
  `hip` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `outfits`
--

CREATE TABLE `outfits` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  `category` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `outfits`
--

INSERT INTO `outfits` (`id`, `created_at`, `updated_at`, `deleted_at`, `category`) VALUES
(1, NULL, NULL, NULL, 'Tops'),
(2, NULL, NULL, NULL, 'Bottoms'),
(3, NULL, NULL, NULL, 'Dresses'),
(4, NULL, NULL, NULL, 'Suits'),
(5, NULL, NULL, NULL, 'Tote Bags');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  `name` longtext DEFAULT NULL,
  `tailor_id` bigint(20) UNSIGNED DEFAULT NULL,
  `desc` longtext DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `img_url` longtext NOT NULL,
  `size` longtext NOT NULL,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `created_at`, `updated_at`, `deleted_at`, `name`, `tailor_id`, `desc`, `price`, `img_url`, `size`, `is_active`) VALUES
(1, '0000-00-00 00:00:00.000', '2024-06-22 19:55:49.019', NULL, 'Woman’s Blouse', 1, 'Hazelnut Woman’s Blouse', 99, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2Fproduct_blouse.png?alt=media&token=164e3c54-02d9-464b-bac5-3fe96f893e68', 'M', 1),
(2, '0000-00-00 00:00:00.000', '2024-06-22 19:55:49.995', NULL, 'Batik Blouse', 1, 'Brown Batik Strecht Blouse', 129, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2Fproduct_batik.png?alt=media&token=72797945-0015-4b21-a5df-efa89be7a9bb', 'S', 1),
(3, '0000-00-00 00:00:00.000', '2024-06-22 10:46:33.099', NULL, 'Men’s Suit Set', 1, 'Men’s Suit Set in Brown', 11123, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2Fmensuit.png?alt=media&token=79594f88-0722-42c7-8afc-23bed95aeb48', 'L', 1),
(4, '0000-00-00 00:00:00.000', '2024-06-22 10:23:45.632', NULL, 'Red Totebag', 4, 'Red Canvas Totebag', 159, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2Ftotebag4-removebg-preview.png?alt=media&token=4a8133d2-a30f-41ac-ad0e-036f09b4897a', 'M', 1),
(5, NULL, NULL, NULL, 'Oversize Tshirt', 13, 'Black oversize cotton tshirt', 199, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FProduct_Oshirt.png?alt=media&token=e9dce880-45d0-473d-b1b9-79124c8d65b0', 'XL', 1),
(6, NULL, NULL, NULL, 'Oversize Hoodie', 13, 'Navy Hoodie Classic', 399, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2Fhoodie%20navy.png?alt=media&token=fbb5f3b8-a95a-4a5e-b8dc-36864427b136', 'S', 1),
(7, NULL, NULL, NULL, 'Men\'s Trousers', 6, 'Action Trousers Navy', 199, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2Ftrousers%20mens%20navy.png?alt=media&token=15fed33f-9d60-4ae7-8d29-d83385bc4813', 'S', 1),
(8, NULL, NULL, NULL, 'Plain Sweater', 11, 'White Plain Sweater Shirt, Men and Women', 399, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2Fwhite%20sweater.png?alt=media&token=1502554e-4542-4199-9583-2dc324d586ed', 'S', 1),
(9, NULL, NULL, NULL, 'Polo Tshirt', 9, 'Navy Polo Tshirt, Men and Women', 559, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2Fdark%20blue%20polo%20tshirt.png?alt=media&token=03606602-5efd-474f-953c-ce5fe94cf28c', 'XS', 1),
(10, NULL, NULL, NULL, 'Bomber Jacket', 8, 'Black Bomber Jacket, Men and Women', 399, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2Fbomber%20jacket.png?alt=media&token=0ce3e607-b2e4-4687-9c4a-c5850a9e5abe', 'M', 1),
(11, NULL, NULL, NULL, 'Turtleneck', 10, 'Men\'s Black Turtleneck', 499, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2Fturtleneck.jpg?alt=media&token=64f02e66-63f1-4e8e-990a-906bc43cab74', 'XS', 1),
(12, NULL, NULL, NULL, 'Women\'s Crop Top', 7, 'Layered Long Crop Top', 299, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2Fcroptop.png?alt=media&token=f6c3ade8-357f-4648-b1cc-e895f9cd3274', 'M', 1),
(13, NULL, NULL, NULL, 'Denim Pants', 6, 'Denim Blue Black Pants', 259, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2Fdenim_blue_lack-removebg-preview.png?alt=media&token=9bc7030d-cb98-45ba-be5a-717791511448', 'S', 1),
(14, NULL, NULL, NULL, 'Work Pants', 2, 'Olive Work Pants', 399, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2Fwork_pants.png?alt=media&token=5e224c94-dc49-4ac0-b736-539d8a0f7f81', 'L', 1),
(15, NULL, NULL, NULL, 'Vneck Dress', 8, 'Light Grey Vneck Dress', 399, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2Fvneck_dress.png?alt=media&token=42fd19c9-0df0-44d2-b106-7299659d4798', 'S', 1),
(16, NULL, NULL, NULL, 'Jogger Pants', 11, 'Black Jogger Pants', 299, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2Fjogger-removebg-preview.png?alt=media&token=65bda9af-7e7d-4cf9-8722-a70e7011896d', 'M', 1),
(17, NULL, NULL, NULL, 'Regular Fit Linen-blend shirt', 7, 'Light Beige Regular Fit Linen-blend shirt', 399, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2Ffit_linen_shirt.png?alt=media&token=a9777e52-e6ea-460b-88f8-9cd05970710b', 'M', 1),
(18, NULL, NULL, NULL, 'Tie-belt jersey jumpsuit', 10, 'Dark Beige Tie-belt jersey jumpsuit', 399, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2Fjumpsuit.png?alt=media&token=e0491025-6b93-441c-9d8b-5152dc9d0704', 'S', 1),
(19, NULL, NULL, NULL, 'Women\'s Cardigan', 9, 'Light Pink Women\'s Cardigan', 299, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2Fcardigan.png?alt=media&token=d2395f64-ec18-47d4-ac85-88db7b345a5a', 'S', 1),
(20, NULL, NULL, NULL, 'Women\'s Puff-Sleeved Top', 11, 'White Women\'s Puff-Sleeved Top', 299, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2Fpuff_sleeved-removebg-preview.png?alt=media&token=e673344a-4e3a-4bb2-985f-f03d6dd2c8ef', 'M', 1),
(21, NULL, NULL, NULL, 'Puffer Jacket', 7, 'Black Puffer Jacket', 499, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FBlack_Puffer_Jacket.png?alt=media&token=2b6ae178-4889-43e2-841b-2038d2eff9d5', 'S', 1),
(22, NULL, NULL, NULL, 'Women\'s Ribbed Vest Top', 20, 'Black and White Women\'s Ribbed Vest Top', 199, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FBlack_White_Women_s__Ribbed_Vest_Top.png?alt=media&token=fa85a529-6c0c-4f06-a972-ab8c4cc4c72f', 'XS', 1),
(23, NULL, NULL, NULL, 'Women\'s Jersey Crepe Pants', 14, 'Black Women\'s Jersey Crepe Pants', 359, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FBlack%20Women\'s%20Jersey%20Crepe%20Pants_prev_ui.png?alt=media&token=89547a43-a51a-48c8-9894-1cca7ed62086', 'L', 1),
(24, NULL, NULL, NULL, 'Women\'s Oversize Cotton Overshirt', 17, 'Black Women\'s Oversize Cotton Overshirt', 289, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FBlack%20Women\'s%20Oversized%20Cotton%20Overshirt_prev_ui.png?alt=media&token=1dc47af6-c452-475e-b9f8-199a2da5b9ff', 'XS', 1),
(25, NULL, NULL, NULL, 'Women\'s Tapered-Waist Dress', 19, 'Black Women\'s Tapered-Waist Dress', 699, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FBlack%20Women\'s%20Tapered-waist%20shirt%20dress_prev_ui.png?alt=media&token=2bf8cb0b-cef9-473c-ae9d-443d119c95ff', 'M', 1),
(26, NULL, NULL, NULL, 'Women\'s Denim Short Pants', 16, 'Blue Women\'s Denim Short Pants', 329, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FBlue%20Women\'s%20Denim%20Short%20Pants_prev_ui.png?alt=media&token=604abb28-373b-496a-9683-63e44421a745', 'XS', 1),
(27, NULL, NULL, NULL, 'Women\'s Turtleneck Dress', 15, 'Cream Women\'s Turtleneck Dress', 599, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FCream%20Women\'s%20Turtleneck%20Dress_prev_ui.png?alt=media&token=3952964c-9726-47aa-ad50-f14295781e48', 'L', 1),
(28, NULL, NULL, NULL, 'Women\'s Pleated Skirt', 14, 'Dark Brown Women\'s Pleated Skirt', 299, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FDark%20Brown%20Women\'s%20Pleated%20skirt_prev_ui.png?alt=media&token=5568107d-1230-4cc7-a192-11f6f1768d2d', 'XL', 1),
(29, NULL, NULL, NULL, 'Women\'s Vneck Tunic', 18, 'Green Leaf-Patterned Women\'s Vneck Tunic', 529, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FGreen%20Leaf-patterned%20Vneck%20Tunic_prev_ui.png?alt=media&token=f0d4a9ce-9dba-44e3-a272-b9b57e8c8cae', 'M', 1),
(30, NULL, NULL, NULL, 'Men\'s Slim Fit Jacket', 5, 'Grey Checked Men\'s Slim Fit Jacket', 999, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FGrey%20Checked%20Men\'s%20Slim%20Fit%20Jacket_prev_ui.png?alt=media&token=21b3f44c-6546-4b1e-b9b4-aac3edfb171d', 'L', 1),
(31, NULL, NULL, NULL, 'Women\'s Cigarette Pants', 19, 'Light Green Women\'s Cigarette Pants', 349, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FLight%20Green%20Women\'s%20Cigarette%20Pants_prev_ui.png?alt=media&token=44a6ad07-7a29-4188-bdff-fdfcee1a1ca8', 'L', 1),
(32, NULL, NULL, NULL, 'Women\'s Tube Top', 20, 'Orange and Red Women\'s Tube Top', 249, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FOrange%20Red%20women\'s%20Tube%20Top_prev_ui.png?alt=media&token=07e507ea-b335-401d-a8e6-34ef1faa2c89', 'M', 1),
(33, NULL, NULL, NULL, 'Women\'s Ribbed Pencil Skirt', 15, 'Orange Women\'s Ribbed Pencil Skirt', 399, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FOrange%20Women\'s%20Ribbed%20pencil%20skirt_prev_ui.png?alt=media&token=5fb12700-de55-40d9-a523-cc7515a55027', 'M', 1),
(34, NULL, NULL, NULL, 'Women\'s Satin Shirt', 17, 'White Women\'s Satin Shirt', 399, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FWhite%20Women\'s%20Satin%20Shirt_prev_ui.png?alt=media&token=3b624c68-36f6-49d6-bb14-5ff529fdfcff', 'L', 1),
(35, NULL, NULL, NULL, 'Purple Dress', 1, 'Women\'s Purple Dress', 500, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FPruple%20dress.png?alt=media&token=09a01510-f25b-4071-9767-45949c65168c', 'L', 1),
(36, NULL, NULL, NULL, 'Pink Dress', 1, 'Pink Party Dress', 450, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FPink%20Dress.png?alt=media&token=9758c565-460f-44fd-ab3b-8a60ef3b2d4e', 'M', 1),
(37, NULL, NULL, NULL, 'Blue Dress', 1, 'Blue Party Dress', 600, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FBlue%20dress.png?alt=media&token=c43783d7-e08d-4822-9188-99b6941dc532', 'S', 1),
(38, NULL, NULL, NULL, 'Gold Dress', 1, 'Gold Party Dress', 550, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FGold%20dress.png?alt=media&token=b8eafc67-dc84-42c1-95e5-de6b63c3fa94', 'M', 1),
(39, NULL, NULL, NULL, 'Red Dress', 1, 'Red Floral Dress', 600, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FRed%20floral%20Dress.png?alt=media&token=b01fdef8-d698-4127-82e4-121f3eb994bc', 'M', 1),
(40, NULL, NULL, NULL, 'Grey Skirt', 2, 'Women\'s Grey Skirt', 200, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FGrey%20Skirt.png?alt=media&token=5eeaaebb-4f79-418e-a679-4ff97e10b7f8', 'S', 1),
(41, NULL, NULL, NULL, 'Blue Skirt', 2, 'Women\'s Blue Skirt', 250, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FBlue%20skirt.png?alt=media&token=110809d8-f1e1-409a-b09a-e6ac324f7bd4', 'M', 1),
(42, NULL, NULL, NULL, 'Checkered Skirt', 2, 'Red and Black Checkered Skirt', 300, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FRed%20and%20black%20checkered%20skirt.png?alt=media&token=ad60b27d-6f84-46f5-8e55-a2c62555074c', 'M', 1),
(43, NULL, NULL, NULL, 'Green Shirt', 1, 'Green CropTop', 350, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FGreen%20CropTop.png?alt=media&token=af288c1c-b89d-45fe-b95f-b5af8b229fcb', 'L', 1),
(44, NULL, NULL, NULL, 'Red Shirt', 1, 'Red CropTop', 400, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FRed%20Croptop.png?alt=media&token=1b3164ff-ec4c-4905-9698-108933dd8a1c', 'S', 1),
(45, NULL, NULL, NULL, 'Women\'s Outer', 1, 'Stripes Outer', 450, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FStripes%20Outer.png?alt=media&token=4747e349-c346-46bd-9dd2-07548ea566fa', 'M', 1),
(46, NULL, NULL, NULL, 'Beige Pants', 2, 'Men\'s Beige Pants', 350, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FBeige%20Pants.png?alt=media&token=51167420-1f52-41b7-942c-ec822bf368d3', 'L', 1),
(47, NULL, NULL, NULL, 'Blue Jeans', 2, 'Men\'s Blue Jeans', 500, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FBlue%20pants.png?alt=media&token=4f07be42-f813-4cb4-bf16-2a4e82928746', 'M', 1),
(48, NULL, NULL, NULL, 'Cargo Pants', 2, 'Men\'s Cargo Pants', 450, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FCargo%20Pants.png?alt=media&token=daaab0d9-7cda-43c8-834c-85205a0262d4', 'XL', 1),
(49, NULL, NULL, NULL, 'Black Pants', 2, 'Women\'s Black Pants', 350, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FWomen\'s%20Black%20Pants.png?alt=media&token=c9b32175-920f-4ea6-bb06-abd857bf5bb8', 'XS', 1),
(50, NULL, NULL, NULL, 'Denim Jeans', 2, 'Women\'s Short Denim Jeans', 400, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FWomen\'s%20Short%20Denim%20Jeans.png?alt=media&token=fdc9ba46-d7eb-45ca-bb67-4ad3a3717e26', 'S', 1),
(51, NULL, NULL, NULL, 'White Pants', 2, 'Women\'s White Pants', 350, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FWomen\'s%20White%20Pants.png?alt=media&token=bc9b3916-e938-4884-94d4-6a8a89a8d17a', 'M', 1),
(52, NULL, NULL, NULL, 'Black Suit', 3, 'Men\'s Black Suit', 650, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FBlack%20Suit.png?alt=media&token=960ecf12-e5c3-4317-a71f-38c5b5f11d73', 'L', 1),
(53, NULL, NULL, NULL, 'Black Tshirt', 3, 'Men\'s Black Tshirt', 250, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FBlack%20Tshirt.png?alt=media&token=008987c1-dc8a-4903-9a66-f6e3dcf9e252', 'M', 1),
(54, NULL, NULL, NULL, 'Black Collared Shirt', 3, 'Men\'s Black Collared Shirt', 350, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FBlack%20collared%20Shirt.png?alt=media&token=b8187b3b-18db-4fe7-9fdd-de2e3ea3d638', 'S', 1),
(55, NULL, NULL, NULL, 'Blue Collared Shirt', 3, 'Men\'s Blue Collared Shirt', 350, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FBlue%20collared%20shirt.png?alt=media&token=33d71db3-a7e0-4a22-ad93-8dbb12a553f4', 'XL', 1),
(56, NULL, NULL, NULL, 'Blue Suit', 3, 'Men\'s Blue Suit', 600, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FBlue%20suit.png?alt=media&token=7ad52251-bdc0-4e72-89d9-9ef52d594806', 'M', 1),
(57, NULL, NULL, NULL, 'Grey Tshirt', 3, 'Men\'s Grey Tshirt', 250, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FGrey%20Tshirt.png?alt=media&token=3539ade6-8b49-4bb6-8601-5d4f37d38e4f', 'L', 1),
(58, NULL, NULL, NULL, 'Orange Tshirt', 3, 'Men\'s Orange Tshirt with Picture', 300, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FOrange%20Tshirt.png?alt=media&token=76520435-2b67-4979-b233-20e6aba99357', 'M', 1),
(59, NULL, NULL, NULL, 'White Tshirt', 3, 'Men\'s White Tshirt', 250, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FWhite%20Tshirt.png?alt=media&token=2831c334-566e-455e-93d8-8d8c0ca6f56c', 'S', 1),
(60, NULL, NULL, NULL, 'Yellow Collared Shirt', 3, 'Men\'s Yellow Collared Shirt', 350, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FYellow%20collared%20Shirt.png?alt=media&token=ac5602f4-644e-4b35-822b-d72a912bbdb7', 'XL', 1),
(61, NULL, NULL, NULL, 'Pink Skirt', 3, 'Women\'s Pink Skirt', 350, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Products%2FPink%20Skirt.png?alt=media&token=4248f7a8-27ea-4f80-9df7-bd806b5a1e05', 'S', 1),
(62, '2024-06-22 13:19:55.066', '2024-06-22 13:19:55.066', NULL, 'Biodiversite Tote Bag', 3, 'Beige Biodiversity Tote Bag', 99, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/images%2F2024-06-22T06%3A19%3A54.370Z?alt=media&token=7a54f15a-7049-4abb-8066-bd6ce72ab26c', 'S', 1),
(63, '2024-06-22 14:02:29.415', '2024-06-22 14:02:29.415', NULL, 'Tropics Daily Grind', 9, 'Tote Bag Color: Natural Straw', 150, 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/images%2F2024-06-22T07%3A02%3A28.474Z?alt=media&token=aba09f52-a0a2-4cf4-861e-d598a0c4ec92', 'M', 1);

-- --------------------------------------------------------

--
-- Table structure for table `promos`
--

CREATE TABLE `promos` (
  `promo_code` varchar(191) NOT NULL,
  `discount` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `promos`
--

INSERT INTO `promos` (`promo_code`, `discount`) VALUES
('TECH15', 150000),
('TECH35', 350000),
('TECH75', 750000);

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` longtext DEFAULT NULL,
  `desc` longtext DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `request_type` bigint(20) UNSIGNED DEFAULT NULL,
  `tailor_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `suits`
--

CREATE TABLE `suits` (
  `request_id` bigint(20) UNSIGNED NOT NULL,
  `chest` longtext DEFAULT NULL,
  `waist` longtext DEFAULT NULL,
  `hip` longtext DEFAULT NULL,
  `shoulder` longtext DEFAULT NULL,
  `sleeve_length` longtext DEFAULT NULL,
  `jacket_length` longtext DEFAULT NULL,
  `inseam` longtext DEFAULT NULL,
  `outseam` longtext DEFAULT NULL,
  `thigh` longtext DEFAULT NULL,
  `knee` longtext DEFAULT NULL,
  `ankle` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tailors`
--

CREATE TABLE `tailors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  `name` longtext DEFAULT NULL,
  `email` longtext DEFAULT NULL,
  `password` longtext DEFAULT NULL,
  `address` longtext DEFAULT NULL,
  `img_url` longtext NOT NULL,
  `money` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tailors`
--

INSERT INTO `tailors` (`id`, `created_at`, `updated_at`, `deleted_at`, `name`, `email`, `password`, `address`, `img_url`, `money`) VALUES
(1, '0000-00-00 00:00:00.000', '2024-06-22 13:46:06.138', NULL, 'Dev’s Fashion', 'devmendrofa@gmail.com', 'devinalovefred', 'Jakarta Barat', 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Tailors%2Fdevtailorhouse.png?alt=media&token=1e312fb8-7207-4e2d-ac00-2554cebe43f3', 107),
(2, NULL, NULL, NULL, 'Cia Tailor House', 'ciatailor@gmail.com', 'ciatailorhouse', 'Jakarta Barat', 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Tailors%2Fciafashion.png?alt=media&token=4a94ea8e-aaf0-4ae1-b9f5-6b2e70d55133', 0),
(3, NULL, NULL, NULL, 'Lini Tailor', 'linitailor@gmail.com', 'linitailor', 'Jakarta Timur', 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Tailors%2Flinitailor.png?alt=media&token=2d0bf848-06b6-486e-83c9-8a7d600307b4', 0),
(4, NULL, NULL, NULL, 'Ritna Tailor', 'ritna99@gmail.com', 'ritnacantik', 'Cibubur', 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Tailors%2FLanaTailor.png?alt=media&token=7a184c8c-cc98-4319-bc15-da5ee259d7c6', 0),
(5, NULL, NULL, NULL, 'Amy\'s Fashion', 'amyfashion0@gmail.com', '4myf4shi0n', 'Jakarta Utara', 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Tailors%2Famytailor.png?alt=media&token=c82fd7f7-efa4-48ed-8989-8acc6303b8ee', 0),
(6, NULL, NULL, NULL, 'Kate Fashion', 'KateTailorOrg@gmail.com', 'Katekati', 'Jakarta Pusat', 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Tailors%2Fkatetailor.png?alt=media&token=79515e28-ad0b-4e50-9034-01184d1f8311', 0),
(7, NULL, NULL, NULL, 'Liaoxi Couture', 'laoshi@gmail.com', 'xixixixi', 'Jakarta Timur', 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Tailors%2FLiaoxiTailor.jpg?alt=media&token=6ecb8604-b8a4-438c-97d9-f14d07d7f080', 0),
(8, NULL, NULL, NULL, 'Bryan Bespoke', 'Bryann@gmail.com', 'Bryanmiokuning', 'Jakarta Pusat', 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Tailors%2FBryanTailor.jpg?alt=media&token=613d9ed5-5231-41b2-8a23-9ed401dd6b54', 0),
(9, NULL, NULL, NULL, 'Messi Taylor & Co', 'ankaramessi@gmail.com', 'messi1gol', 'Jakarta Barat', 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Tailors%2FMessiTailor.jpg?alt=media&token=fd8bda5a-c0e4-4192-9463-7d3413666c0b', 0),
(10, NULL, NULL, NULL, 'Bob Clothiers', 'bob2622@gmail.com', 'bobibola', 'Bekasi', 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Tailors%2FBobTailor.jpg?alt=media&token=ecae87b7-ac0f-43be-8379-bb99b76b777e', 0),
(11, '0000-00-00 00:00:00.000', '2024-06-21 20:24:21.080', NULL, 'Igna Tailorworks', 'Igna22@gmail.com', 'Ignanunu', 'Pantai Indah Kapuk', 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Tailors%2FIgnaTailor.jpg?alt=media&token=b160d11c-fc0b-4c76-929c-4435f0e70257', 558),
(12, NULL, NULL, NULL, 'Jack Sartorial', 'jacktailor@gmail.com', 'jack99tail0', 'Jakarta Selatan', 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Tailors%2FJackTailor.jpg?alt=media&token=9c8741a5-a97f-456b-b1cd-b904fd6e6248', 0),
(13, NULL, NULL, NULL, 'Blondi\'s Clothing', 'blondi@gmail.com', 'blondi2dua', 'Jakarta Barat', 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Tailors%2Fblonditailor.png?alt=media&token=7b884337-5bf6-450b-a990-75c462319653', 0),
(14, NULL, NULL, NULL, 'David\'s Style', 'd4vidstyle@gmail.com', 'd4vidstyl3s', 'Jakarta Barat', 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Tailors%2FDavidTailor.jpg?alt=media&token=fb05eec7-e9ad-4d7f-9836-c24c0b4378ef', 0),
(15, NULL, NULL, NULL, 'Ahmad Tailor', 'ahmadtailor@gmail.com', 'ahmaddanini', 'Jakarta Pusat', 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Tailors%2FAhmadTailor.jpg?alt=media&token=e703e797-7aa6-401a-8877-6107414577f9', 0),
(16, NULL, NULL, NULL, 'Verrel\'s Tailor Shop', 'verreltailor@gmail.com', 'v3rr3ltailorswift', 'Jakarta Barat', 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Tailors%2FVerrelTailor.jpg?alt=media&token=da689612-ec4c-476d-ac5c-864a06639d18', 0),
(17, NULL, NULL, NULL, 'Tina\'s Touch', 'tinafashion@gmail.com', 'tinatoon', 'Jakarta Selatan', 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Tailors%2Ftinatailor.png?alt=media&token=29eab57d-a7ad-45a1-9ec9-fbd9b55e8fc0', 0),
(18, NULL, NULL, NULL, 'Natasha\'s Tailor', 'natashatailor@gmail.com', 'natashaaja00', 'Jakarta Timur', 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Tailors%2FNatashaTailor.jpg?alt=media&token=3d89c127-9f5d-4c97-bf4a-0b32b2166e40', 0),
(19, NULL, NULL, NULL, 'Verren\'s Tailor', 'verrentailors@gmail.com', 'verrensiaps', 'Jakarta Timur', 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Tailors%2FVerrenTailor.jpg?alt=media&token=10fe13c8-64be-4d94-9cf6-a9299517102a', 0),
(20, NULL, NULL, NULL, 'Chris Handcrafted', 'christailor@gmail.com', 'christiankenny', 'Jakarta Utara', 'https://firebasestorage.googleapis.com/v0/b/tailortech-1112.appspot.com/o/Tailors%2FChrisTailor.jpg?alt=media&token=db58d44e-2f64-450c-a2e0-2b8cffd2ac1b', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tailor_prices`
--

CREATE TABLE `tailor_prices` (
  `tailor_id` bigint(20) UNSIGNED NOT NULL,
  `outfit_id` bigint(20) UNSIGNED NOT NULL,
  `price` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tailor_prices`
--

INSERT INTO `tailor_prices` (`tailor_id`, `outfit_id`, `price`) VALUES
(1, 1, 112),
(1, 3, 350),
(1, 4, 1112),
(2, 1, 200),
(2, 2, 150),
(3, 1, 475),
(3, 2, 550),
(3, 3, 3500),
(3, 4, 3000),
(3, 5, 150),
(4, 1, 500),
(4, 2, 525),
(5, 1, 135),
(5, 2, 125),
(6, 1, 300),
(6, 2, 400),
(6, 3, 2250),
(7, 1, 400),
(7, 2, 450),
(8, 4, 1500),
(8, 5, 125),
(9, 4, 1750),
(9, 5, 135),
(10, 1, 550),
(10, 4, 1500),
(11, 2, 175),
(11, 3, 195),
(12, 1, 225),
(12, 2, 250),
(13, 1, 1300),
(13, 3, 1325),
(14, 4, 1450),
(14, 5, 3000),
(15, 4, 1200),
(15, 5, 2000),
(16, 3, 3550),
(16, 4, 3450),
(16, 5, 4250),
(17, 1, 450),
(17, 2, 530),
(18, 3, 3250),
(18, 4, 3350),
(19, 3, 4225),
(19, 4, 4000),
(19, 5, 5150),
(20, 3, 1550),
(20, 4, 1400),
(20, 5, 2500);

-- --------------------------------------------------------

--
-- Table structure for table `tailor_ratings`
--

CREATE TABLE `tailor_ratings` (
  `tailor_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `rating` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tops`
--

CREATE TABLE `tops` (
  `request_id` bigint(20) UNSIGNED NOT NULL,
  `chest` longtext DEFAULT NULL,
  `shoulder_to_waist` longtext DEFAULT NULL,
  `shoulder` longtext DEFAULT NULL,
  `sleve_length` longtext DEFAULT NULL,
  `waist` longtext DEFAULT NULL,
  `neck` longtext DEFAULT NULL,
  `collar` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tote_bags`
--

CREATE TABLE `tote_bags` (
  `request_id` bigint(20) UNSIGNED NOT NULL,
  `color` longtext DEFAULT NULL,
  `material` longtext DEFAULT NULL,
  `writing` longtext DEFAULT NULL,
  `image_desc` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  `transaction_date` datetime(3) DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `tailor_id` bigint(20) UNSIGNED DEFAULT NULL,
  `status` longtext DEFAULT NULL,
  `total_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tran_products`
--

CREATE TABLE `tran_products` (
  `transaction_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tran_requests`
--

CREATE TABLE `tran_requests` (
  `transaction_id` bigint(20) UNSIGNED NOT NULL,
  `request_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  `name` longtext DEFAULT NULL,
  `email` longtext DEFAULT NULL,
  `phone_number` longtext DEFAULT NULL,
  `password` longtext DEFAULT NULL,
  `address` longtext DEFAULT NULL,
  `points` bigint(20) DEFAULT NULL,
  `money` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_promos`
--

CREATE TABLE `user_promos` (
  `promo_code` varchar(191) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `wishlists`
--

CREATE TABLE `wishlists` (
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assistants`
--
ALTER TABLE `assistants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_assistants_deleted_at` (`deleted_at`);

--
-- Indexes for table `assistant_bookings`
--
ALTER TABLE `assistant_bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_assistant_bookings_deleted_at` (`deleted_at`),
  ADD KEY `fk_assistant_bookings_assistant` (`assistant_id`),
  ADD KEY `fk_assistant_bookings_user` (`user_id`);

--
-- Indexes for table `bottoms`
--
ALTER TABLE `bottoms`
  ADD PRIMARY KEY (`request_id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`user_id`,`product_id`),
  ADD KEY `fk_carts_product` (`product_id`);

--
-- Indexes for table `dresses`
--
ALTER TABLE `dresses`
  ADD PRIMARY KEY (`request_id`);

--
-- Indexes for table `outfits`
--
ALTER TABLE `outfits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_outfits_deleted_at` (`deleted_at`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_products_deleted_at` (`deleted_at`),
  ADD KEY `fk_tailors_products` (`tailor_id`);

--
-- Indexes for table `promos`
--
ALTER TABLE `promos`
  ADD PRIMARY KEY (`promo_code`);

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_requests_deleted_at` (`deleted_at`),
  ADD KEY `fk_users_saved_requests` (`user_id`),
  ADD KEY `fk_requests_req_type` (`request_type`),
  ADD KEY `fk_requests_tailor` (`tailor_id`);

--
-- Indexes for table `suits`
--
ALTER TABLE `suits`
  ADD PRIMARY KEY (`request_id`);

--
-- Indexes for table `tailors`
--
ALTER TABLE `tailors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_tailors_deleted_at` (`deleted_at`);

--
-- Indexes for table `tailor_prices`
--
ALTER TABLE `tailor_prices`
  ADD PRIMARY KEY (`tailor_id`,`outfit_id`),
  ADD KEY `fk_tailor_prices_outfit` (`outfit_id`);

--
-- Indexes for table `tailor_ratings`
--
ALTER TABLE `tailor_ratings`
  ADD PRIMARY KEY (`tailor_id`,`user_id`),
  ADD KEY `fk_tailor_ratings_user` (`user_id`);

--
-- Indexes for table `tops`
--
ALTER TABLE `tops`
  ADD PRIMARY KEY (`request_id`);

--
-- Indexes for table `tote_bags`
--
ALTER TABLE `tote_bags`
  ADD PRIMARY KEY (`request_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_transactions_deleted_at` (`deleted_at`),
  ADD KEY `fk_users_transactions` (`user_id`);

--
-- Indexes for table `tran_products`
--
ALTER TABLE `tran_products`
  ADD PRIMARY KEY (`transaction_id`,`product_id`),
  ADD KEY `fk_tran_products_product` (`product_id`);

--
-- Indexes for table `tran_requests`
--
ALTER TABLE `tran_requests`
  ADD PRIMARY KEY (`transaction_id`,`request_id`),
  ADD KEY `fk_tran_requests_request` (`request_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_users_deleted_at` (`deleted_at`);

--
-- Indexes for table `user_promos`
--
ALTER TABLE `user_promos`
  ADD PRIMARY KEY (`promo_code`,`user_id`),
  ADD KEY `fk_user_promos_user` (`user_id`);

--
-- Indexes for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD PRIMARY KEY (`user_id`,`product_id`),
  ADD KEY `fk_wishlists_product` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assistants`
--
ALTER TABLE `assistants`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `assistant_bookings`
--
ALTER TABLE `assistant_bookings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `bottoms`
--
ALTER TABLE `bottoms`
  MODIFY `request_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `dresses`
--
ALTER TABLE `dresses`
  MODIFY `request_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `outfits`
--
ALTER TABLE `outfits`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `suits`
--
ALTER TABLE `suits`
  MODIFY `request_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `tailors`
--
ALTER TABLE `tailors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `tops`
--
ALTER TABLE `tops`
  MODIFY `request_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `tote_bags`
--
ALTER TABLE `tote_bags`
  MODIFY `request_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assistant_bookings`
--
ALTER TABLE `assistant_bookings`
  ADD CONSTRAINT `fk_assistant_bookings_assistant` FOREIGN KEY (`assistant_id`) REFERENCES `assistants` (`id`),
  ADD CONSTRAINT `fk_assistant_bookings_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `bottoms`
--
ALTER TABLE `bottoms`
  ADD CONSTRAINT `fk_bottoms_request` FOREIGN KEY (`request_id`) REFERENCES `requests` (`id`);

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `fk_carts_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `fk_carts_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `dresses`
--
ALTER TABLE `dresses`
  ADD CONSTRAINT `fk_dresses_request` FOREIGN KEY (`request_id`) REFERENCES `requests` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_tailors_products` FOREIGN KEY (`tailor_id`) REFERENCES `tailors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `requests`
--
ALTER TABLE `requests`
  ADD CONSTRAINT `fk_requests_req_type` FOREIGN KEY (`request_type`) REFERENCES `outfits` (`id`),
  ADD CONSTRAINT `fk_requests_tailor` FOREIGN KEY (`tailor_id`) REFERENCES `tailors` (`id`),
  ADD CONSTRAINT `fk_users_saved_requests` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `suits`
--
ALTER TABLE `suits`
  ADD CONSTRAINT `fk_suits_request` FOREIGN KEY (`request_id`) REFERENCES `requests` (`id`);

--
-- Constraints for table `tailor_prices`
--
ALTER TABLE `tailor_prices`
  ADD CONSTRAINT `fk_tailor_prices_outfit` FOREIGN KEY (`outfit_id`) REFERENCES `outfits` (`id`),
  ADD CONSTRAINT `fk_tailor_prices_tailor` FOREIGN KEY (`tailor_id`) REFERENCES `tailors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tailor_ratings`
--
ALTER TABLE `tailor_ratings`
  ADD CONSTRAINT `fk_tailor_ratings_tailor` FOREIGN KEY (`tailor_id`) REFERENCES `tailors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_tailor_ratings_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `tops`
--
ALTER TABLE `tops`
  ADD CONSTRAINT `fk_tops_request` FOREIGN KEY (`request_id`) REFERENCES `requests` (`id`);

--
-- Constraints for table `tote_bags`
--
ALTER TABLE `tote_bags`
  ADD CONSTRAINT `fk_tote_bags_request` FOREIGN KEY (`request_id`) REFERENCES `requests` (`id`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `fk_users_transactions` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `tran_products`
--
ALTER TABLE `tran_products`
  ADD CONSTRAINT `fk_tran_products_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `fk_tran_products_transaction` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`);

--
-- Constraints for table `tran_requests`
--
ALTER TABLE `tran_requests`
  ADD CONSTRAINT `fk_tran_requests_request` FOREIGN KEY (`request_id`) REFERENCES `requests` (`id`),
  ADD CONSTRAINT `fk_tran_requests_transaction` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`);

--
-- Constraints for table `user_promos`
--
ALTER TABLE `user_promos`
  ADD CONSTRAINT `fk_user_promos_promo` FOREIGN KEY (`promo_code`) REFERENCES `promos` (`promo_code`),
  ADD CONSTRAINT `fk_user_promos_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD CONSTRAINT `fk_wishlists_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `fk_wishlists_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
