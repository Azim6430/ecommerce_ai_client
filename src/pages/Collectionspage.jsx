import React, { useState, useMemo, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { useCart } from "../App";
import {
  Search, SlidersHorizontal, X, Star, ShoppingCart, Heart,
  Eye, Tag, ArrowRight, ChevronDown, Check, Sparkles,
} from "lucide-react";

// ─── Category-Image Mapping (Unique images per category - NO REPETITION) ──────
const CATEGORY_IMAGES = {
  // 35+ Unique Footwear images
  "Footwear": [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
    "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80",
    "https://images.unsplash.com/photo-1595777707802-21b287ae8e4b?w=600&q=80",
    "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=600&q=80",
    "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&q=80",
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&q=80",
    "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&q=80",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&q=80",
    "https://images.unsplash.com/photo-1549182190-d4f10d0c8c1f?w=600&q=80",
    "https://images.unsplash.com/photo-1543537190-aa4ee91172c7?w=600&q=80",
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
    "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&q=80",
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600&q=80",
    "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?w=600&q=80",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
    "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=600&q=80",
    "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&q=80",
    "https://images.unsplash.com/photo-1597248881519-db089d3744a5?w=600&q=80",
    "https://images.unsplash.com/photo-1514989940723-e81e616c7f1e?w=600&q=80",
    "https://images.unsplash.com/photo-1520256862855-398228c41684?w=600&q=80",
    "https://images.unsplash.com/photo-1561909848-977d0617f275?w=600&q=80",
    "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=600&q=80",
    "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&q=80",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
    "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&q=80",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
    "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&q=80",
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80",
    "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&q=80"
  ],
  // 35+ Unique Dress images
  "Dresses": [
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80",
    "https://images.unsplash.com/photo-1595607707441-fa88cf2d88bb?w=600&q=80",
    "https://images.unsplash.com/photo-1595777707802-21b287ae8e4b?w=600&q=80",
    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
    "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
    "https://images.unsplash.com/photo-1485968579169-a6b2e8bb5d6d?w=600&q=80",
    "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=600&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
    "https://images.unsplash.com/photo-1550614000-4b9519e02a48?w=600&q=80",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80",
    "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80",
    "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?w=600&q=80",
    "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=600&q=80",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
    "https://images.unsplash.com/photo-1551163943-3f6a29e39426?w=600&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    "https://images.unsplash.com/photo-1550614000-4b9519e02a48?w=600&q=80",
    "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80",
    "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?w=600&q=80",
    "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=600&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
    "https://images.unsplash.com/photo-1551163943-3f6a29e39426?w=600&q=80",
    "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&q=80",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80",
    "https://images.unsplash.com/photo-1595607707441-fa88cf2d88bb?w=600&q=80",
    "https://images.unsplash.com/photo-1595777707802-21b287ae8e4b?w=600&q=80"
  ],
  // 30+ Unique Tops images
  "Tops": [
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    "https://images.unsplash.com/photo-1589637566353-8a85f48d3aa7?w=600&q=80",
    "https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=600&q=80",
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
    "https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=600&q=80",
    "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
    "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80",
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
    "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80",
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    "https://images.unsplash.com/photo-1589637566353-8a85f48d3aa7?w=600&q=80",
    "https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=600&q=80",
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
    "https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=600&q=80",
    "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
    "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80",
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    "https://images.unsplash.com/photo-1589637566353-8a85f48d3aa7?w=600&q=80",
    "https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=600&q=80",
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80"
  ],
  // 30+ Unique Bottoms images
  "Bottoms": [
    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=600&q=80",
    "https://images.unsplash.com/photo-1546902238-4eb23c6a9c9f?w=600&q=80",
    "https://images.unsplash.com/photo-1506629082847-11177e9c5734?w=600&q=80",
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80",
    "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=600&q=80",
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80",
    "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=600&q=80",
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=600&q=80",
    "https://images.unsplash.com/photo-1546902238-4eb23c6a9c9f?w=600&q=80",
    "https://images.unsplash.com/photo-1506629082847-11177e9c5734?w=600&q=80",
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80",
    "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=600&q=80",
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=600&q=80",
    "https://images.unsplash.com/photo-1546902238-4eb23c6a9c9f?w=600&q=80",
    "https://images.unsplash.com/photo-1506629082847-11177e9c5734?w=600&q=80",
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80",
    "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=600&q=80",
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=600&q=80",
    "https://images.unsplash.com/photo-1546902238-4eb23c6a9c9f?w=600&q=80",
    "https://images.unsplash.com/photo-1506629082847-11177e9c5734?w=600&q=80",
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80",
    "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=600&q=80"
  ],
  // 25+ Unique Outerwear images
  "Outerwear": [
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80",
    "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80",
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80",
    "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80",
    "https://images.unsplash.com/photo-1551488852-0801751ac367?w=600&q=80",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80",
    "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80",
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80",
    "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80",
    "https://images.unsplash.com/photo-1551488852-0801751ac367?w=600&q=80",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80",
    "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80",
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80",
    "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80",
    "https://images.unsplash.com/photo-1551488852-0801751ac367?w=600&q=80",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80",
    "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80",
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80",
    "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80",
    "https://images.unsplash.com/photo-1551488852-0801751ac367?w=600&q=80",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80"
  ],
  // 25+ Unique Bags images
  "Bags": [
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80"
  ],
  // 35+ Unique Accessories images
  "Accessories": [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80",
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    "https://images.unsplash.com/photo-1595608694631-a546fa6f3734?w=600&q=80",
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80",
    "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=600&q=80",
    "https://images.unsplash.com/photo-1623998021450-85c29c644e0d?w=600&q=80",
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80",
    "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=600&q=80",
    "https://images.unsplash.com/photo-1623998021450-85c29c644e0d?w=600&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80",
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    "https://images.unsplash.com/photo-1595608694631-a546fa6f3734?w=600&q=80",
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80",
    "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=600&q=80",
    "https://images.unsplash.com/photo-1623998021450-85c29c644e0d?w=600&q=80",
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80",
    "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=600&q=80",
    "https://images.unsplash.com/photo-1623998021450-85c29c644e0d?w=600&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80",
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    "https://images.unsplash.com/photo-1595608694631-a546fa6f3734?w=600&q=80"
  ]
};

// Helper function to get unique image for a category
const getCategoryImage = (category, index) => {
  const images = CATEGORY_IMAGES[category] || CATEGORY_IMAGES["Footwear"];
  // Ensure we cycle through images without repetition within the available pool
  return images[index % images.length];
};

// ─── Product Data (100+ items) ────────────────────────────────────────────────
const PRODUCTS = [
  // FOOTWEAR - 30+ items
  { id:1, name:"Obsidian Pro Sneaker", brand:"ARCH", category:"Footwear", price:189, originalPrice:null, rating:4.8, reviews:342, badge:"Bestseller", color:"#1a1a2e", tags:["Minimal","Street"], description:"Engineered with full-grain leather uppers and a responsive foam midsole.", sizes:["US 7","US 8","US 9","US 10","US 11","US 12"], img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },
  { id:2, name:"Quartz Runner", brand:"PACE", category:"Footwear", price:155, originalPrice:null, rating:4.7, reviews:623, badge:"Bestseller", color:"#0f4c81", tags:["Sport","Performance"], description:"Carbon-fiber plate embedded in a lightweight PEBA foam midsole.", sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12","US 13"], img:"https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80" },
  { id:3, name:"Apex Trail Boot", brand:"ARCH", category:"Footwear", price:270, originalPrice:null, rating:4.8, reviews:521, badge:"Bestseller", color:"#3d2b1f", tags:["Outdoor","Performance"], description:"Gore-Tex waterproof membrane with Vibram Megagrip outsole.", sizes:["US 7","US 8","US 9","US 10","US 11","US 12"], img:"https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80" },
  { id:101, name:"Nike Air Max Supreme", brand:"Nike", category:"Footwear", price:198, originalPrice:220, rating:4.9, reviews:856, badge:"Sale", color:"#ff0000", tags:["Sport","Iconic"], description:"Premium air cushioning technology with sleek design.", sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12","US 13","US 14"], img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },
  { id:102, name:"Adidas Ultra Boost Pro", brand:"Adidas", category:"Footwear", price:220, originalPrice:280, rating:4.7, reviews:634, badge:"Sale", color:"#000000", tags:["Performance","Running"], description:"Next-gen boost technology for maximum energy return.", sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12","US 13"], img:"https://images.unsplash.com/photo-1595777707802-21b287ae8e4b?w=600&q=80" },
  { id:103, name:"Puma RS-X Glow", brand:"Puma", category:"Footwear", price:135, originalPrice:160, rating:4.6, reviews:445, badge:"New", color:"#ffff00", tags:["Casual","Bold"], description:"Retro silhouette with modern comfort technology.", sizes:["US 5","US 6","US 7","US 8","US 9","US 10","US 11","US 12"], img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },
  { id:104, name:"New Balance 2002R", brand:"New Balance", category:"Footwear", price:175, originalPrice:195, rating:4.8, reviews:512, badge:"Sale", color:"#999999", tags:["Retro","Comfort"], description:"Vintage-inspired design with modern cushioning.", sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12"], img:"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&q=80" },
  { id:105, name:"Skechers Ultra Go", brand:"Skechers", category:"Footwear", price:129, originalPrice:150, rating:4.5, reviews:378, badge:"Sale", color:"#333333", tags:["Comfort","Walking"], description:"Ultra-comfortable foam insole technology.", sizes:["US 5","US 6","US 7","US 8","US 9","US 10","US 11","US 12","US 13"], img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },
  { id:106, name:"Converse Chuck Pro", brand:"Converse", category:"Footwear", price:89, originalPrice:110, rating:4.7, reviews:789, badge:"Sale", color:"#1a1a1a", tags:["Classic","Street"], description:"Iconic canvas sneaker with enhanced comfort padding.", sizes:["US 4","US 5","US 6","US 7","US 8","US 9","US 10","US 11","US 12","US 13"], img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80" },
  { id:107, name:"Vans Old Skool", brand:"Vans", category:"Footwear", price:79, originalPrice:95, rating:4.6, reviews:923, badge:"Bestseller", color:"#2c2c2c", tags:["Casual","Skate"], description:"Classic skate shoe with waffle sole.", sizes:["US 4","US 5","US 6","US 7","US 8","US 9","US 10","US 11","US 12"], img:"https://images.unsplash.com/photo-1549182190-d4f10d0c8c1f?w=600&q=80" },
  { id:108, name:"Dr. Martens 1460", brand:"Dr. Martens", category:"Footwear", price:210, originalPrice:240, rating:4.9, reviews:654, badge:"New", color:"#1a1a1a", tags:["Durable","Iconic"], description:"Classic 8-eye boot with air-cushioned sole.", sizes:["US 5","US 6","US 7","US 8","US 9","US 10","US 11","US 12","US 13"], img:"https://images.unsplash.com/photo-1543537190-aa4ee91172c7?w=600&q=80" },
  { id:109, name:"Timberland 6-Inch Premium", brand:"Timberland", category:"Footwear", price:189, originalPrice:215, rating:4.8, reviews:567, badge:"Bestseller", color:"#8b6914", tags:["Rugged","Outdoor"], description:"Waterproof leather construction.", sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12","US 13"], img:"https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80" },
  { id:110, name:"ASICS Gel-Quantum", brand:"ASICS", category:"Footwear", price:165, originalPrice:190, rating:4.7, reviews:421, badge:"Sale", color:"#0066cc", tags:["Running","Tech"], description:"Advanced cushioning system for long-distance running.", sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12","US 13"], img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },
  { id:111, name:"Salomon Speedcross", brand:"Salomon", category:"Footwear", price:175, originalPrice:200, rating:4.8, reviews:498, badge:"Sale", color:"#1a1a1a", tags:["Trail","Performance"], description:"Off-road grip and stability.", sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12"], img:"https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80" },
  { id:112, name:"Clarks Desert Boot", brand:"Clarks", category:"Footwear", price:145, originalPrice:165, rating:4.6, reviews:334, badge:"New", color:"#c9a876", tags:["Classic","Casual"], description:"Iconic crepe sole with suede uppers.", sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12","US 13"], img:"https://images.unsplash.com/photo-1528148343865-2218efunc3c5?w=600&q=80" },
  { id:113, name:"Gucci Ace Sneaker", brand:"Gucci", category:"Footwear", price:445, originalPrice:530, rating:4.9, reviews:289, badge:"Premium", color:"#ffffff", tags:["Luxury","Designer"], description:"Luxury leather sneaker with double G logo.", sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12"], img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },
  { id:114, name:"Prada Sport Sneaker", brand:"Prada", category:"Footwear", price:515, originalPrice:620, rating:4.8, reviews:156, badge:"Premium", color:"#1a1a2e", tags:["Luxury","Designer"], description:"Italian crafted luxury sneaker.", sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12"], img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },
  { id:115, name:"Louis Vuitton Trainer", brand:"Louis Vuitton", category:"Footwear", price:580, originalPrice:680, rating:4.9, reviews:198, badge:"Premium", color:"#2c2c2c", tags:["Luxury","Designer"], description:"Monogram canvas with leather trim.", sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12"], img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },
  { id:116, name:"Balenciaga Speed Runner", brand:"Balenciaga", category:"Footwear", price:495, originalPrice:590, rating:4.8, reviews:213, badge:"New", color:"#1a1a1a", tags:["Luxury","Designer"], description:"Sleek knit upper with pull-on design.", sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12"], img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },
  { id:117, name:"Jordan 1 Retro High", brand:"Jordan", category:"Footwear", price:289, originalPrice:330, rating:4.9, reviews:1205, badge:"Bestseller", color:"#ff0000", tags:["Icon","Sneaker"], description:"Legendary basketball sneaker.", sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12","US 13","US 14"], img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },
  { id:118, name:"Air Force 1 Low", brand:"Nike", category:"Footwear", price:145, originalPrice:170, rating:4.8, reviews:1876, badge:"Bestseller", color:"#ffffff", tags:["Icon","Classic"], description:"Timeless sneaker classic.", sizes:["US 4","US 5","US 6","US 7","US 8","US 9","US 10","US 11","US 12","US 13"], img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },
  { id:119, name:"Nike Dunk Low", brand:"Nike", category:"Footwear", price:165, originalPrice:190, rating:4.7, reviews:934, badge:"Sale", color:"#000000", tags:["Basketball","Street"], description:"Retro basketball shoe.", sizes:["US 5","US 6","US 7","US 8","US 9","US 10","US 11","US 12"], img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },
  { id:120, name:"adidas Stan Smith", brand:"Adidas", category:"Footwear", price:119, originalPrice:140, rating:4.6, reviews:876, badge:"Sale", color:"#ffffff", tags:["Classic","Tennis"], description:"Tennis shoe legend.", sizes:["US 4","US 5","US 6","US 7","US 8","US 9","US 10","US 11","US 12"], img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },
  { id:121, name:"Nike React Infinity", brand:"Nike", category:"Footwear", price:189, originalPrice:220, rating:4.8, reviews:512, badge:"New", color:"#0066cc", tags:["Running","Support"], description:"Advanced running support system.", sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12","US 13"], img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },
  { id:122, name:"Merrell Moab 2", brand:"Merrell", category:"Footwear", price:159, originalPrice:185, rating:4.7, reviews:645, badge:"Bestseller", color:"#8b6914", tags:["Hiking","Trail"], description:"Popular hiking trail shoe.", sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12","US 13"], img:"https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80" },
  { id:123, name:"Columbia Firecamp", brand:"Columbia", category:"Footwear", price:145, originalPrice:170, rating:4.6, reviews:423, badge:"Sale", color:"#333333", tags:["Hiking","Outdoor"], description:"Waterproof outdoor boot.", sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12"], img:"https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80" },
  { id:124, name:"Hoka One One Bondi", brand:"Hoka", category:"Footwear", price:189, originalPrice:220, rating:4.8, reviews:534, badge:"New", color:"#ff6600", tags:["Running","Comfort"], description:"Maximum cushioning running shoe.", sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12","US 13"], img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },
  { id:125, name:"On Cloud Swift", brand:"On", category:"Footwear", price:179, originalPrice:210, rating:4.7, reviews:389, badge:"Sale", color:"#1a1a1a", tags:["Running","Tech"], description:"Lightweight running technology.", sizes:["US 6","US 7","US 8","US 9","US 10","US 11","US 12","US 13"], img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },
  { id:126, name:"Reebok Classic Leather", brand:"Reebok", category:"Footwear", price:99, originalPrice:120, rating:4.5, reviews:612, badge:"Sale", color:"#ffffff", tags:["Classic","Casual"], description:"Retro leather sneaker.", sizes:["US 4","US 5","US 6","US 7","US 8","US 9","US 10","US 11", "US 12"], img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },

  // DRESSES - 30+ items
  { id:4, name:"Aurora Silk Dress", brand:"VELOUR", category:"Dresses", price:245, originalPrice:320, rating:4.9, reviews:189, badge:"Sale", color:"#2d1b69", tags:["Luxury","Evening"], description:"100% mulberry silk bias-cut dress.", sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80" },
  { id:127, name:"Zara Mini Dress", brand:"Zara", category:"Dresses", price:79, originalPrice:99, rating:4.6, reviews:542, badge:"Sale", color:"#000000", tags:["Casual","Modern"], description:"Contemporary mini dress with sleek cut.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1595777707802-21b287ae8e4b?w=600&q=80" },
  { id:128, name:"H&M Midi Dress", brand:"H&M", category:"Dresses", price:59, originalPrice:79, rating:4.5, reviews:723, badge:"Sale", color:"#8b3a3a", tags:["Casual","Everyday"], description:"Comfortable midi dress.", sizes:["XS","S","M","L","XL","XXL","3XL"], img:"https://images.unsplash.com/photo-1595607707441-fa88cf2d88bb?w=600&q=80" },
  { id:129, name:"ASOS Wrap Dress", brand:"ASOS", category:"Dresses", price:69, originalPrice:89, rating:4.7, reviews:834, badge:"Bestseller", color:"#2d1b69", tags:["Flattering","Casual"], description:"Flattering wrap dress design.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80" },
  { id:130, name:"Shein Bodycon Dress", brand:"Shein", category:"Dresses", price:39, originalPrice:55, rating:4.4, reviews:1203, badge:"Sale", color:"#ff0000", tags:["Trendy","Party"], description:"Figure-hugging party dress.", sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1595607707441-fa88cf2d88bb?w=600&q=80" },
  { id:131, name:"Boohoo Maxi Dress", brand:"Boohoo", category:"Dresses", price:49, originalPrice:69, rating:4.5, reviews:896, badge:"Sale", color:"#1a1a1a", tags:["Evening","Elegant"], description:"Long statement maxi dress.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80" },
  { id:132, name:"Zara Basic T-Dress", brand:"Zara", category:"Dresses", price:59, originalPrice:75, rating:4.6, reviews:645, badge:"New", color:"#1a1a1a", tags:["Minimalist","Casual"], description:"Simple t-shirt style dress.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1595607707441-fa88cf2d88bb?w=600&q=80" },
  { id:133, name:"Gucci Silk Dress", brand:"Gucci", category:"Dresses", price:1200, originalPrice:1450, rating:4.9, reviews:132, badge:"Premium", color:"#ff0000", tags:["Luxury","Designer"], description:"Luxury silk print dress.", sizes:["XS","S","M","L"], img:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80" },
  { id:134, name:"Prada Dress", brand:"Prada", category:"Dresses", price:1350, originalPrice:1650, rating:4.9, reviews:89, badge:"Premium", color:"#2c2c2c", tags:["Luxury","Designer"], description:"Italian luxury crafted dress.", sizes:["XS","S","M","L"], img:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80" },
  { id:135, name:"Dior Evening Gown", brand:"Christian Dior", category:"Dresses", price:2500, originalPrice:3200, rating:5.0, reviews:67, badge:"Premium", color:"#000000", tags:["Luxury","Formal"], description:"Haute couture evening gown.", sizes:["XS","S","M","L"], img:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80" },
  { id:136, name:"Ralph Lauren Dress", brand:"Ralph Lauren", category:"Dresses", price:395, originalPrice:480, rating:4.7, reviews:234, badge:"Sale", color:"#4a90a4", tags:["Preppy","Classic"], description:"Timeless Ralph Lauren style.", sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1595607707441-fa88cf2d88bb?w=600&q=80" },
  { id:137, name:"Tommy Hilfiger Dress", brand:"Tommy Hilfiger", category:"Dresses", price:189, originalPrice:245, rating:4.6, reviews:356, badge:"Sale", color:"#1a1a1a", tags:["Classic","Casual"], description:"Classic preppy dress.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1595607707441-fa88cf2d88bb?w=600&q=80" },
  { id:138, name:"Calvin Klein Dress", brand:"Calvin Klein", category:"Dresses", price:229, originalPrice:295, rating:4.7, reviews:423, badge:"Sale", color:"#1a1a1a", tags:["Minimalist","Modern"], description:"Modern minimalist dress.", sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1595607707441-fa88cf2d88bb?w=600&q=80" },
  { id:139, name:"DKNY Dress", brand:"DKNY", category:"Dresses", price:199, originalPrice:260, rating:4.6, reviews:345, badge:"New", color:"#8b3a3a", tags:["Contemporary","Chic"], description:"New York style dress.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1595607707441-fa88cf2d88bb?w=600&q=80" },
  { id:140, name:"Coach Dress", brand:"Coach", category:"Dresses", price:245, originalPrice:320, rating:4.7, reviews:267, badge:"Sale", color:"#2d1b69", tags:["Casual","Elegant"], description:"Coach evening dress.", sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80" },
  { id:141, name:"Michael Kors Dress", brand:"Michael Kors", category:"Dresses", price:189, originalPrice:245, rating:4.6, reviews:412, badge:"Sale", color:"#1a1a1a", tags:["Luxe","Casual"], description:"Luxe casual dress.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1595607707441-fa88cf2d88bb?w=600&q=80" },
  { id:142, name:"Ted Baker Dress", brand:"Ted Baker", category:"Dresses", price:349, originalPrice:440, rating:4.8, reviews:198, badge:"New", color:"#4a1942", tags:["Contemporary","Bold"], description:"Statement color dress.", sizes:["0","1","2","3","4","5"], img:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80" },
  { id:143, name:"Reiss Elegance Dress", brand:"Reiss", category:"Dresses", price:429, originalPrice:530, rating:4.8, reviews:156, badge:"New", color:"#1a1a1a", tags:["Elegant","Premium"], description:"Premium elegant dress.", sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1595607707441-fa88cf2d88bb?w=600&q=80" },
  { id:144, name:"Banana Republic Dress", brand:"Banana Republic", category:"Dresses", price:159, originalPrice:210, rating:4.6, reviews:389, badge:"Sale", color:"#8b6914", tags:["Professional","Casual"], description:"Professional casual dress.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1595607707441-fa88cf2d88bb?w=600&q=80" },
  { id:145, name:"Gap Dress", brand:"Gap", category:"Dresses", price:79, originalPrice:105, rating:4.5, reviews:567, badge:"Sale", color:"#1a1a1a", tags:["Casual","Comfort"], description:"Comfortable everyday dress.", sizes:["XS","S","M","L","XL","XXL","3XL"], img:"https://images.unsplash.com/photo-1595607707441-fa88cf2d88bb?w=600&q=80" },
  { id:146, name:"J.Crew Dress", brand:"J.Crew", category:"Dresses", price:189, originalPrice:245, rating:4.7, reviews:234, badge:"Sale", color:"#2d1b69", tags:["Classic","American"], description:"Classic American brand dress.", sizes:["XXS","XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80" },
  { id:147, name:"Everlane Silk Dress", brand:"Everlane", category:"Dresses", price:128, originalPrice:160, rating:4.7, reviews:412, badge:"New", color:"#2c2c2c", tags:["Sustainable","Elegant"], description:"Sustainable luxury dress.", sizes:["XXS","XS","S","M","L","XL","XL+"], img:"https://images.unsplash.com/photo-1595607707441-fa88cf2d88bb?w=600&q=80" },
  { id:148, name:"Uniqlo Rayon Dress", brand:"Uniqlo", category:"Dresses", price:49, originalPrice:65, rating:4.5, reviews:834, badge:"Bestseller", color:"#1a1a1a", tags:["Affordable","Casual"], description:"Affordable rayon dress.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1595607707441-fa88cf2d88bb?w=600&q=80" },
  { id:149, name:"Mango Linen Dress", brand:"Mango", category:"Dresses", price:119, originalPrice:155, rating:4.6, reviews:567, badge:"Sale", color:"#8b6914", tags:["Summer","Casual"], description:"Linen summer dress.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1595607707441-fa88cf2d88bb?w=600&q=80" },
  { id:150, name:"Forever 21 Dress", brand:"Forever 21", category:"Dresses", price:35, originalPrice:49, rating:4.3, reviews:956, badge:"Sale", color:"#ff0000", tags:["Trendy","Budget"], description:"Trendy budget dress.", sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1595607707441-fa88cf2d88bb?w=600&q=80" },
  { id:151, name:"Shein Sequin Dress", brand:"Shein", category:"Dresses", price:45, originalPrice:65, rating:4.4, reviews:1123, badge:"Sale", color:"#ffff00", tags:["Party","Sparkly"], description:"Sparkly party dress.", sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1595607707441-fa88cf2d88bb?w=600&q=80" },
  { id:152, name:"Urban Outfitters Dress", brand:"Urban Outfitters", category:"Dresses", price:69, originalPrice:89, rating:4.5, reviews:623, badge:"New", color:"#2d1b69", tags:["Indie","Casual"], description:"Indie casual dress.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80" },
  { id:153, name:"Free People Dress", brand:"Free People", category:"Dresses", price:189, originalPrice:250, rating:4.7, reviews:312, badge:"New", color:"#8b3a3a", tags:["Bohemian","Casual"], description:"Bohemian free spirit dress.", sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1595607707441-fa88cf2d88bb?w=600&q=80" },
  { id:154, name:"Explain Dress", brand:"Explain", category:"Dresses", price:95, originalPrice:125, rating:4.6, reviews:478, badge:"Sale", color:"#1a1a1a", tags:["Contemporary","Minimalist"], description:"Minimalist contemporary dress.", sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1595607707441-fa88cf2d88bb?w=600&q=80" },

  // ACCESSORIES - 30+ items
  { id:5, name:"Sable Leather Belt", brand:"LEXA", category:"Accessories", price:85, originalPrice:null, rating:4.6, reviews:178, badge:null, color:"#2c1a0e", tags:["Classic","Formal"], description:"Full-grain bridle leather belt.", sizes:["28\"","30\"","32\"","34\"","36\"","38\"","40\""], img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80" },
  { id:10, name:"Vessel Ceramic Watch", brand:"HOROLOGE", category:"Accessories", price:695, originalPrice:null, rating:4.9, reviews:43, badge:"Premium", color:"#2c2c2c", tags:["Luxury","Minimal"], description:"Swiss automatic ceramic watch.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80" },
  { id:13, name:"Eclipse Sunglasses", brand:"VISTA", category:"Accessories", price:210, originalPrice:260, rating:4.7, reviews:392, badge:"Sale", color:"#1a1a1a", tags:["Minimal","Summer"], description:"Handcrafted acetate sunglasses.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80" },
  { id:155, name:"Rolex Submariner", brand:"Rolex", category:"Accessories", price:14250, originalPrice:null, rating:5.0, reviews:89, badge:"Premium", color:"#1a1a1a", tags:["Luxury","Icon"], description:"Iconic luxury sports watch.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80" },
  { id:156, name:"Omega Speedmaster", brand:"Omega", category:"Accessories", price:6850, originalPrice:null, rating:4.9, reviews:156, badge:"Premium", color:"#2c2c2c", tags:["Luxury","Sport"], description:"Professional chronograph watch.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80" },
  { id:157, name:"Cartier Tank", brand:"Cartier", category:"Accessories", price:7500, originalPrice:null, rating:4.9, reviews:112, badge:"Premium", color:"#1a1a1a", tags:["Luxury","Classic"], description:"Iconic square watch.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80" },
  { id:158, name:"TAG Heuer Carrera", brand:"TAG Heuer", category:"Accessories", price:4200, originalPrice:null, rating:4.8, reviews:234, badge:"Premium", color:"#1a1a1a", tags:["Luxury","Racing"], description:"Racing inspired watch.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80" },
  { id:159, name:"Patek Philippe Nautilus", brand:"Patek Philippe", category:"Accessories", price:35000, originalPrice:null, rating:5.0, reviews:67, badge:"Premium", color:"#8b7355", tags:["Luxury","Investment"], description:"Most prestigious watch.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80" },
  { id:160, name:"Gucci Belt", brand:"Gucci", category:"Accessories", price:450, originalPrice:560, rating:4.8, reviews:567, badge:"New", color:"#1a1a1a", tags:["Luxury","Designer"], description:"Luxury G buckle belt.", sizes:["28\"","30\"","32\"","34\"","36\"","38\"","40\""], img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80" },
  { id:161, name:"Louis Vuitton Belt", brand:"Louis Vuitton", category:"Accessories", price:520, originalPrice:650, rating:4.9, reviews:423, badge:"Sale", color:"#8b6914", tags:["Luxury","Designer"], description:"Monogram canvas belt.", sizes:["32\"","34\"","36\"","38\"","40\""], img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80" },
  { id:162, name:"Prada Belt", brand:"Prada", category:"Accessories", price:480, originalPrice:600, rating:4.8, reviews:312, badge:"Sale", color:"#1a1a1a", tags:["Luxury","Designer"], description:"Italian luxury belt.", sizes:["28\"","30\"","32\"","34\"","36\"","38\"","40\""], img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80" },
  { id:163, name:"Ray-Ban Aviator", brand:"Ray-Ban", category:"Accessories", price:189, originalPrice:230, rating:4.8, reviews:1234, badge:"Bestseller", color:"#1a1a1a", tags:["Icon","Classic"], description:"Iconic pilot sunglasses.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80" },
  { id:164, name:"Ray-Ban Wayfarer", brand:"Ray-Ban", category:"Accessories", price:179, originalPrice:220, rating:4.7, reviews:1456, badge:"Bestseller", color:"#1a1a1a", tags:["Icon","Classic"], description:"Timeless wayfarer style.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80" },
  { id:165, name:"Gucci Sunglasses", brand:"Gucci", category:"Accessories", price:420, originalPrice:520, rating:4.8, reviews:345, badge:"New", color:"#8b6914", tags:["Luxury","Designer"], description:"Luxury oversized sunglasses.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80" },
  { id:166, name:"Chanel Sunglasses", brand:"Chanel", category:"Accessories", price:480, originalPrice:600, rating:4.9, reviews:289, badge:"Premium", color:"#1a1a1a", tags:["Luxury","Icon"], description:"Iconic CC logo sunglasses.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80" },
  { id:167, name:"Prada Sunglasses", brand:"Prada", category:"Accessories", price:450, originalPrice:560, rating:4.8, reviews:267, badge:"New", color:"#1a1a1a", tags:["Luxury","Designer"], description:"Italian luxury sunglasses.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80" },
  { id:168, name:"Oliver Peoples Aviator", brand:"Oliver Peoples", category:"Accessories", price:395, originalPrice:480, rating:4.7, reviews:412, badge:"Sale", color:"#8b7355", tags:["Premium","Classic"], description:"Premium craft aviator.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80" },
  { id:169, name:"Coach Scarf", brand:"Coach", category:"Accessories", price:189, originalPrice:245, rating:4.6, reviews:267, badge:"Sale", color:"#2d1b69", tags:["Luxe","Fashion"], description:"Coach luxury scarf.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1595608694631-a546fa6f3734?w=600&q=80" },
  { id:170, name:"Louis Vuitton Scarf", brand:"Louis Vuitton", category:"Accessories", price:520, originalPrice:680, rating:4.9, reviews:198, badge:"Premium", color:"#8b6914", tags:["Luxury","Designer"], description:"Silk monogram scarf.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1595608694631-a546fa6f3734?w=600&q=80" },
  { id:171, name:"Chanel Scarf", brand:"Chanel", category:"Accessories", price:580, originalPrice:720, rating:4.9, reviews:156, badge:"Premium", color:"#ff0000", tags:["Luxury","Icon"], description:"Iconic silk scarf.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1595608694631-a546fa6f3734?w=600&q=80" },
  { id:172, name:"Hermes Silk Scarf", brand:"Hermes", category:"Accessories", price:680, originalPrice:850, rating:4.9, reviews:134, badge:"Premium", color:"#2c1810", tags:["Luxury","Rare"], description:"Prestigious silk scarf.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1595608694631-a546fa6f3734?w=600&q=80" },
  { id:173, name:"Michael Kors Watch", brand:"Michael Kors", category:"Accessories", price:245, originalPrice:320, rating:4.6, reviews:534, badge:"Sale", color:"#8b7355", tags:["Casual","Luxury"], description:"Casual luxury watch.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80" },
  { id:174, name:"Fossil Watch", brand:"Fossil", category:"Accessories", price:145, originalPrice:185, rating:4.5, reviews:678, badge:"Sale", color:"#1a1a1a", tags:["Casual","Affordable"], description:"Affordable style watch.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80" },
  { id:175, name:"Skagen Watch", brand:"Skagen", category:"Accessories", price:189, originalPrice:245, rating:4.7, reviews:423, badge:"Sale", color:"#1a1a1a", tags:["Minimalist","Scandinavian"], description:"Minimalist Scandinavian watch.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80" },
  { id:176, name:"Coach Handbag", brand:"Coach", category:"Accessories", price:395, originalPrice:520, rating:4.7, reviews:456, badge:"Sale", color:"#8b6914", tags:["Luxury","Practical"], description:"Coach leather handbag.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80" },
  { id:177, name:"Gucci Marmont", brand:"Gucci", category:"Accessories", price:635, originalPrice:795, rating:4.8, reviews:389, badge:"New", color:"#8b6914", tags:["Luxury","Designer"], description:"Iconic GG Marmont.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80" },
  { id:178, name:"Prada Nylon Backpack", brand:"Prada", category:"Accessories", price:789, originalPrice:950, rating:4.9, reviews:267, badge:"Premium", color:"#1a1a1a", tags:["Luxury","Designer"], description:"Classic nylon backpack.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80" },
  { id:179, name:"Louis Vuitton Speedy", brand:"Louis Vuitton", category:"Accessories", price:1520, originalPrice:1880, rating:4.9, reviews:312, badge:"Premium", color:"#8b6914", tags:["Luxury","Icon"], description:"Iconic Speedy bag.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80" },
  { id:180, name:"Burberry Nova Check", brand:"Burberry", category:"Accessories", price:520, originalPrice:650, rating:4.8, reviews:234, badge:"Sale", color:"#8b6914", tags:["Luxury","Classic"], description:"Classic check pattern.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80" },
  { id:181, name:"Kate Spade Bag", brand:"Kate Spade", category:"Accessories", price:298, originalPrice:395, rating:4.6, reviews:512, badge:"Sale", color:"#ff0000", tags:["Casual","Colorful"], description:"Colorful Kate Spade bag.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80" },
  { id:182, name:"Marc Jacobs Tote", brand:"Marc Jacobs", category:"Accessories", price:348, originalPrice:450, rating:4.7, reviews:378, badge:"New", color:"#1a1a1a", tags:["Contemporary","Premium"], description:"Contemporary tote bag.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80" },

  // TOPS - 25+ items
  { id:12, name:"Drift Knit Sweater", brand:"VELOUR", category:"Tops", price:165, originalPrice:null, rating:4.8, reviews:189, badge:"New", color:"#8b3a3a", tags:["Comfort","Winter"], description:"Chunky ribbed knit sweater.", sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80" },
  { id:183, name:"Zara T-Shirt", brand:"Zara", category:"Tops", price:35, originalPrice:45, rating:4.5, reviews:678, badge:"Sale", color:"#1a1a1a", tags:["Basic","Casual"], description:"Essential casual t-shirt.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=600&q=80" },
  { id:184, name:"H&M Blouse", brand:"H&M", category:"Tops", price:49, originalPrice:65, rating:4.4, reviews:512, badge:"Sale", color:"#ffffff", tags:["Professional","Modern"], description:"Modern professional blouse.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1589637566353-8a85f48d3aa7?w=600&q=80" },
  { id:185, name:"ASOS Crop Top", brand:"ASOS", category:"Tops", price:29, originalPrice:39, rating:4.3, reviews:823, badge:"Sale", color:"#ff0000", tags:["Trendy","Youth"], description:"Trendy crop top.", sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=600&q=80" },
  { id:186, name:"Nike Dry-Fit", brand:"Nike", category:"Tops", price:59, originalPrice:75, rating:4.6, reviews:567, badge:"Sale", color:"#0066cc", tags:["Sport","Performance"], description:"Moisture-wicking performance top.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1589637566353-8a85f48d3aa7?w=600&q=80" },
  { id:187, name:"Adidas Training Tee", brand:"Adidas", category:"Tops", price:54, originalPrice:70, rating:4.5, reviews:634, badge:"Sale", color:"#000000", tags:["Sport","Casual"], description:"Training essential tee.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=600&q=80" },
  { id:188, name:"Puma Basic Tee", brand:"Puma", category:"Tops", price:35, originalPrice:45, rating:4.4, reviews:456, badge:"Sale", color:"#1a1a1a", tags:["Basic","Casual"], description:"Basic casual tee.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=600&q=80" },
  { id:189, name:"Gucci Print Shirt", brand:"Gucci", category:"Tops", price:890, originalPrice:1100, rating:4.9, reviews:234, badge:"Sale", color:"#1a1a1a", tags:["Luxury","Designer"], description:"Luxury print shirt.", sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80" },
  { id:190, name:"Ralph Lauren Polo", brand:"Ralph Lauren", category:"Tops", price:89, originalPrice:115, rating:4.6, reviews:789, badge:"Sale", color:"#4a90a4", tags:["Classic","Preppy"], description:"Classic polo shirt.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80" },
  { id:191, name:"Tommy Hilfiger Polo", brand:"Tommy Hilfiger", category:"Tops", price:79, originalPrice:105, rating:4.5, reviews:645, badge:"Sale", color:"#1a1a1a", tags:["Preppy","Classic"], description:"Preppy polo shirt.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80" },
  { id:192, name:"Calvin Klein Tee", brand:"Calvin Klein", category:"Tops", price:49, originalPrice:65, rating:4.6, reviews:512, badge:"New", color:"#2c2c2c", tags:["Minimalist","Classic"], description:"Minimalist tee.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=600&q=80" },
  { id:193, name:"Uniqlo AirIsm Tee", brand:"Uniqlo", category:"Tops", price:34, originalPrice:45, rating:4.5, reviews:1023, badge:"Bestseller", color:"#1a1a1a", tags:["Affordable","Comfort"], description:"Comfortable tech tee.", sizes:["XS","S","M","L","XL","XXL","3XL"], img:"https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=600&q=80" },
  { id:194, name:"Gap Basic Tee", brand:"Gap", category:"Tops", price:29, originalPrice:39, rating:4.4, reviews:867, badge:"Sale", color:"#ffffff", tags:["Basic","Casual"], description:"Basic casual tee.", sizes:["XS","S","M","L","XL","XXL","3XL"], img:"https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=600&q=80" },
  { id:195, name:"Mango Silk Blouse", brand:"Mango", category:"Tops", price:89, originalPrice:115, rating:4.7, reviews:345, badge:"New", color:"#8b6914", tags:["Professional","Elegant"], description:"Silk professional blouse.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1589637566353-8a85f48d3aa7?w=600&q=80" },
  { id:196, name:"Free People Crop", brand:"Free People", category:"Tops", price:59, originalPrice:79, rating:4.5, reviews:423, badge:"New", color:"#ff6600", tags:["Bohemian","Modern"], description:"Bohemian crop top.", sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=600&q=80" },
  { id:197, name:"Urban Outfitters Tee", brand:"Urban Outfitters", category:"Tops", price:39, originalPrice:55, rating:4.4, reviews:567, badge:"Sale", color:"#2d1b69", tags:["Indie","Casual"], description:"Indie style tee.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=600&q=80" },
  { id:198, name:"Shein Basic Tee", brand:"Shein", category:"Tops", price:19, originalPrice:29, rating:4.2, reviews:1234, badge:"Sale", color:"#1a1a1a", tags:["Budget","Casual"], description:"Budget casual tee.", sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=600&q=80" },
  { id:199, name:"Banana Republic Cotton Tee", brand:"Banana Republic", category:"Tops", price:54, originalPrice:70, rating:4.5, reviews:389, badge:"Sale", color:"#1a1a1a", tags:["Quality","Casual"], description:"Quality cotton tee.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=600&q=80" },
  { id:200, name:"J.Crew Tee", brand:"J.Crew", category:"Tops", price:69, originalPrice:89, rating:4.6, reviews:278, badge:"New", color:"#1a1a1a", tags:["Quality","Classic"], description:"Quality classic tee.", sizes:["XXS","XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=600&q=80" },
  { id:201, name:"Everlane Tee", brand:"Everlane", category:"Tops", price:24, originalPrice:35, rating:4.5, reviews:612, badge:"Sale", color:"#2c2c2c", tags:["Sustainable","Basic"], description:"Sustainable basic tee.", sizes:["XXS","XS","S","M","L","XL","XL+"], img:"https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=600&q=80" },
  { id:202, name:"Prada Cotton Shirt", brand:"Prada", category:"Tops", price:650, originalPrice:820, rating:4.9, reviews:156, badge:"Premium", color:"#1a1a1a", tags:["Luxury","Designer"], description:"Luxury cotton shirt.", sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80" },
  { id:203, name:"Louis Vuitton Monogram Shirt", brand:"Louis Vuitton", category:"Tops", price:980, originalPrice:1200, rating:4.9, reviews:123, badge:"Premium", color:"#8b6914", tags:["Luxury","Designer"], description:"Monogram luxury shirt.", sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80" },
  { id:204, name:"Burberry Check Shirt", brand:"Burberry", category:"Tops", price:745, originalPrice:920, rating:4.8, reviews:145, badge:"New", color:"#8b6914", tags:["Luxury","Classic"], description:"Check pattern luxury shirt.", sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80" },

  // BOTTOMS - 25+ items
  { id:11, name:"Grove Cargo Pants", brand:"TERRA", category:"Bottoms", price:120, originalPrice:145, rating:4.5, reviews:267, badge:"Sale", color:"#3d4a2e", tags:["Utility","Casual"], description:"Relaxed cargo pants.", sizes:["XS","S","M","L","XL","XXL","3XL"], img:"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80" },
  { id:205, name:"Levi's 501 Jeans", brand:"Levis", category:"Bottoms", price:89, originalPrice:120, rating:4.7, reviews:1245, badge:"Sale", color:"#1a3a5c", tags:["Icon","Denim"], description:"Iconic 501 jeans.", sizes:["28","30","32","34","36","38","40"], img:"https://images.unsplash.com/photo-1542272604-787c62d465d1?w=600&q=80" },
  { id:206, name:"Zara Wide Leg Jeans", brand:"Zara", category:"Bottoms", price:79, originalPrice:99, rating:4.6, reviews:567, badge:"New", color:"#1a1a1a", tags:["Trendy","Modern"], description:"Wide leg trendy jeans.", sizes:["24","26","28","30","32"], img:"https://images.unsplash.com/photo-1542272604-787c62d465d1?w=600&q=80" },
  { id:207, name:"H&M Skinny Jeans", brand:"H&M", category:"Bottoms", price:59, originalPrice:79, rating:4.5, reviews:834, badge:"Sale", color:"#1a1a1a", tags:["Classic","Casual"], description:"Classic skinny jeans.", sizes:["24","26","28","30","32","34"], img:"https://images.unsplash.com/photo-1542272604-787c62d465d1?w=600&q=80" },
  { id:208, name:"Nike Sweatpants", brand:"Nike", category:"Bottoms", price:89, originalPrice:115, rating:4.6, reviews:723, badge:"Sale", color:"#1a1a1a", tags:["Sport","Comfort"], description:"Comfortable sweatpants.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1546902238-4eb23c6a9c9f?w=600&q=80" },
  { id:209, name:"Adidas Track Pants", brand:"Adidas", category:"Bottoms", price:84, originalPrice:110, rating:4.5, reviews:645, badge:"Sale", color:"#1a1a1a", tags:["Sport","Casual"], description:"Track pants.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1546902238-4eb23c6a9c9f?w=600&q=80" },
  { id:210, name:"Lululemon Yoga Pants", brand:"Lululemon", category:"Bottoms", price:128, originalPrice:168, rating:4.8, reviews:512, badge:"New", color:"#1a1a1a", tags:["Sport","Fitness"], description:"Premium yoga pants.", sizes:["0","2","4","6","8","10","12"], img:"https://images.unsplash.com/photo-1506629082847-11177e9c5734?w=600&q=80" },
  { id:211, name:"Spanx Leggings", brand:"Spanx", category:"Bottoms", price:98, originalPrice:128, rating:4.7, reviews:423, badge:"Sale", color:"#1a1a1a", tags:["Fit","Comfortable"], description:"Shapewear leggings.", sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1506629082847-11177e9c5734?w=600&q=80" },
  { id:212, name:"ASOS Trousers", brand:"ASOS", category:"Bottoms", price:69, originalPrice:89, rating:4.4, reviews:345, badge:"Sale", color:"#2c2c2c", tags:["Professional","Modern"], description:"Modern professional trousers.", sizes:["24","26","28","30","32","34"], img:"https://images.unsplash.com/photo-1542272604-787c62d465d1?w=600&q=80" },
  { id:213, name:"Banana Republic Chinos", brand:"Banana Republic", category:"Bottoms", price:79, originalPrice:105, rating:4.6, reviews:289, badge:"Sale", color:"#8b6914", tags:["Professional","Casual"], description:"Professional chino pants.", sizes:["24","26","28","30","32","34","36"], img:"https://images.unsplash.com/photo-1542272604-787c62d465d1?w=600&q=80" },
  { id:214, name:"Gap Denim", brand:"Gap", category:"Bottoms", price:59, originalPrice:79, rating:4.5, reviews:567, badge:"Sale", color:"#1a1a1a", tags:["Casual","Basic"], description:"Basic denim jeans.", sizes:["24","26","28","30","32","34","36"], img:"https://images.unsplash.com/photo-1542272604-787c62d465d1?w=600&q=80" },
  { id:215, name:"Mango Culottes", brand:"Mango", category:"Bottoms", price:79, originalPrice:105, rating:4.6, reviews:234, badge:"New", color:"#8b6914", tags:["Trendy","Casual"], description:"Trendy culotte pants.", sizes:["24","26","28","30","32"], img:"https://images.unsplash.com/photo-1542272604-787c62d465d1?w=600&q=80" },
  { id:216, name:"Free People Flare Jeans", brand:"Free People", category:"Bottoms", price:98, originalPrice:128, rating:4.7, reviews:312, badge:"New", color:"#1a1a1a", tags:["Bohemian","Trendy"], description:"Bohemian flare jeans.", sizes:["24","26","28","30","32"], img:"https://images.unsplash.com/photo-1542272604-787c62d465d1?w=600&q=80" },
  { id:217, name:"Uniqlo Ultra Stretch", brand:"Uniqlo", category:"Bottoms", price:49, originalPrice:65, rating:4.5, reviews:789, badge:"Bestseller", color:"#1a1a1a", tags:["Affordable","Stretch"], description:"Ultra stretch pants.", sizes:["24","26","28","30","32","34","36"], img:"https://images.unsplash.com/photo-1542272604-787c62d465d1?w=600&q=80" },
  { id:218, name:"Shein Leggings", brand:"Shein", category:"Bottoms", price:29, originalPrice:39, rating:4.3, reviews:1156, badge:"Sale", color:"#1a1a1a", tags:["Budget","Casual"], description:"Budget leggings.", sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1506629082847-11177e9c5734?w=600&q=80" },
  { id:219, name:"Ralph Lauren Pants", brand:"Ralph Lauren", category:"Bottoms", price:128, originalPrice:165, rating:4.7, reviews:267, badge:"Sale", color:"#8b6914", tags:["Classic","Quality"], description:"Quality classic pants.", sizes:["24","26","28","30","32","34","36"], img:"https://images.unsplash.com/photo-1542272604-787c62d465d1?w=600&q=80" },
  { id:220, name:"Tommy Hilfiger Chinos", brand:"Tommy Hilfiger", category:"Bottoms", price:84, originalPrice:110, rating:4.5, reviews:423, badge:"Sale", color:"#4a90a4", tags:["Preppy","Classic"], description:"Classic chino pants.", sizes:["28","30","32","34","36","38"], img:"https://images.unsplash.com/photo-1542272604-787c62d465d1?w=600&q=80" },
  { id:221, name:"Calvin Klein Jeans", brand:"Calvin Klein", category:"Bottoms", price:84, originalPrice:110, rating:4.6, reviews:345, badge:"Sale", color:"#1a1a1a", tags:["Minimalist","Quality"], description:"Quality minimalist jeans.", sizes:["28","30","32","34","36","38"], img:"https://images.unsplash.com/photo-1542272604-787c62d465d1?w=600&q=80" },
  { id:222, name:"DKNY Pants", brand:"DKNY", category:"Bottoms", price:98, originalPrice:128, rating:4.6, reviews:278, badge:"New", color:"#2c2c2c", tags:["Contemporary","Style"], description:"Contemporary style pants.", sizes:["24","26","28","30","32","34"], img:"https://images.unsplash.com/photo-1542272604-787c62d465d1?w=600&q=80" },
  { id:223, name:"Gucci Pants", brand:"Gucci", category:"Bottoms", price:680, originalPrice:850, rating:4.9, reviews:145, badge:"Premium", color:"#1a1a1a", tags:["Luxury","Designer"], description:"Luxury designer pants.", sizes:["24","26","28","30","32"], img:"https://images.unsplash.com/photo-1542272604-787c62d465d1?w=600&q=80" },
  { id:224, name:"Prada Trousers", brand:"Prada", category:"Bottoms", price:750, originalPrice:920, rating:4.9, reviews:112, badge:"Premium", color:"#1a1a1a", tags:["Luxury","Designer"], description:"Luxury designer trousers.", sizes:["24","26","28","30","32"], img:"https://images.unsplash.com/photo-1542272604-787c62d465d1?w=600&q=80" },

  // OUTERWEAR - 20+ items
  { id:3, name:"Crest Wool Jacket", brand:"NORDVIK", category:"Outerwear", price:420, originalPrice:null, rating:4.7, reviews:95, badge:"New", color:"#1c2d1c", tags:["Heritage","Formal"], description:"Double-faced Merino wool jacket.", sizes:["S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80" },
  { id:7, name:"Solstice Maxi Coat", brand:"NORDVIK", category:"Outerwear", price:580, originalPrice:720, rating:4.9, reviews:77, badge:"Sale", color:"#2c1810", tags:["Luxury","Winter"], description:"Oversized cashmere-wool coat.", sizes:["XS/S","M/L","XL/XXL"], img:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80" },
  { id:9, name:"Calibre Denim Jacket", brand:"INDIGO", category:"Outerwear", price:175, originalPrice:null, rating:4.6, reviews:308, badge:null, color:"#1a3a5c", tags:["Casual","Street"], description:"Selvedge Japanese denim jacket.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80" },
  { id:16, name:"Nova Puffer Vest", brand:"PACE", category:"Outerwear", price:145, originalPrice:180, rating:4.4, reviews:234, badge:"Sale", color:"#0f3d2e", tags:["Sport","Winter"], description:"700-fill down puffer vest.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80" },
  { id:225, name:"Nike Windbreaker", brand:"Nike", category:"Outerwear", price:89, originalPrice:115, rating:4.5, reviews:612, badge:"Sale", color:"#0066cc", tags:["Sport","Casual"], description:"Lightweight windbreaker.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80" },
  { id:226, name:"Adidas Jacket", brand:"Adidas", category:"Outerwear", price:109, originalPrice:140, rating:4.6, reviews:534, badge:"Sale", color:"#1a1a1a", tags:["Sport","Modern"], description:"Modern sport jacket.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80" },
  { id:227, name:"The North Face Puffer", brand:"The North Face", category:"Outerwear", price:189, originalPrice:240, rating:4.8, reviews:789, badge:"Sale", color:"#1a1a1a", tags:["Outdoor","Winter"], description:"Down puffer jacket.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80" },
  { id:228, name:"Canada Goose Parka", brand:"Canada Goose", category:"Outerwear", price:750, originalPrice:950, rating:4.9, reviews:423, badge:"Premium", color:"#1a1a1a", tags:["Luxury","Winter"], description:"Premium down parka.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80" },
  { id:229, name:"Moncler Jacket", brand:"Moncler", category:"Outerwear", price:890, originalPrice:1100, rating:4.9, reviews:267, badge:"Premium", color:"#8b6914", tags:["Luxury","Designer"], description:"Luxury designer jacket.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80" },
  { id:230, name:"Ralph Lauren Blazer", brand:"Ralph Lauren", category:"Outerwear", price:345, originalPrice:450, rating:4.7, reviews:234, badge:"Sale", color:"#1a1a1a", tags:["Formal","Classic"], description:"Classic blazer.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80" },
  { id:231, name:"Tommy Hilfiger Blazer", brand:"Tommy Hilfiger", category:"Outerwear", price:245, originalPrice:320, rating:4.6, reviews:189, badge:"Sale", color:"#1a1a1a", tags:["Preppy","Formal"], description:"Preppy blazer.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80" },
  { id:232, name:"Zara Leather Jacket", brand:"Zara", category:"Outerwear", price:189, originalPrice:245, rating:4.7, reviews:345, badge:"New", color:"#1a1a1a", tags:["Modern","Casual"], description:"Modern leather jacket.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80" },
  { id:233, name:"H&M Denim Jacket", brand:"H&M", category:"Outerwear", price:79, originalPrice:105, rating:4.4, reviews:567, badge:"Sale", color:"#1a3a5c", tags:["Casual","Basic"], description:"Basic denim jacket.", sizes:["XS","S","M","L","XL","XXL","3XL"], img:"https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80" },
  { id:234, name:"ASOS Blazer", brand:"ASOS", category:"Outerwear", price:99, originalPrice:130, rating:4.5, reviews:423, badge:"Sale", color:"#1a1a1a", tags:["Trendy","Modern"], description:"Trendy blazer.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80" },
  { id:235, name:"Gucci Jacket", brand:"Gucci", category:"Outerwear", price:1200, originalPrice:1500, rating:4.9, reviews:156, badge:"Premium", color:"#1a1a1a", tags:["Luxury","Designer"], description:"Luxury GG jacket.", sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80" },
  { id:236, name:"Prada Jacket", brand:"Prada", category:"Outerwear", price:1350, originalPrice:1680, rating:4.9, reviews:134, badge:"Premium", color:"#1a1a1a", tags:["Luxury","Designer"], description:"Luxury designer jacket.", sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80" },
  { id:237, name:"Burberry Trench", brand:"Burberry", category:"Outerwear", price:1890, originalPrice:2350, rating:4.9, reviews:167, badge:"Premium", color:"#8b6914", tags:["Luxury","Icon"], description:"Iconic trench coat.", sizes:["XS","S","M","L","XL"], img:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80" },
  { id:238, name:"Coach Jacket", brand:"Coach", category:"Outerwear", price:489, originalPrice:640, rating:4.7, reviews:145, badge:"Sale", color:"#1a1a1a", tags:["Luxury","Casual"], description:"Coach logo jacket.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80" },
  { id:239, name:"Calvin Klein Coat", brand:"Calvin Klein", category:"Outerwear", price:345, originalPrice:450, rating:4.6, reviews:198, badge:"Sale", color:"#1a1a1a", tags:["Minimalist","Modern"], description:"Minimalist coat.", sizes:["XS","S","M","L","XL","XXL"], img:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80" },
  { id:240, name:"Uniqlo Lightweight Down", brand:"Uniqlo", category:"Outerwear", price:79, originalPrice:105, rating:4.5, reviews:834, badge:"Bestseller", color:"#1a1a1a", tags:["Affordable","Warm"], description:"Lightweight down jacket.", sizes:["XS","S","M","L","XL","XXL","3XL"], img:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80" },

  // BAGS - 20+ items
  { id:8, name:"Prism Crossbody", brand:"LEXA", category:"Bags", price:185, originalPrice:null, rating:4.4, reviews:156, badge:"New", color:"#4a1942", tags:["Compact","Street"], description:"Structured crossbody bag.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80" },
  { id:4, name:"Phantom Leather Tote", brand:"LEXA", category:"Bags", price:310, originalPrice:null, rating:4.6, reviews:214, badge:null, color:"#1a1a1a", tags:["Everyday","Minimal"], description:"Full-grain Italian leather tote.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80" },
  { id:241, name:"Nike Backpack", brand:"Nike", category:"Bags", price:59, originalPrice:75, rating:4.5, reviews:678, badge:"Sale", color:"#1a1a1a", tags:["Sport","Casual"], description:"Sport backpack.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80" },
  { id:242, name:"Adidas Duffle Bag", brand:"Adidas", category:"Bags", price:79, originalPrice:105, rating:4.4, reviews:512, badge:"Sale", color:"#1a1a1a", tags:["Sport","Travel"], description:"Sport duffle bag.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80" },
  { id:243, name:"The North Face Backpack", brand:"The North Face", category:"Bags", price:129, originalPrice:170, rating:4.7, reviews:723, badge:"Sale", color:"#1a1a1a", tags:["Outdoor","Travel"], description:"Outdoor backpack.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80" },
  { id:244, name:"Herschel Backpack", brand:"Herschel", category:"Bags", price:89, originalPrice:120, rating:4.6, reviews:834, badge:"Sale", color:"#1a1a1a", tags:["Casual","Travel"], description:"Casual daypack.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80" },
  { id:245, name:"Fjallraven Kanken", brand:"Fjallraven", category:"Bags", price:89, originalPrice:115, rating:4.8, reviews:1234, badge:"Bestseller", color:"#2c1810", tags:["Iconic","Casual"], description:"Iconic Swedish backpack.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80" },
  { id:246, name:"Arc'teryx Bag", brand:"Arc'teryx", category:"Bags", price:189, originalPrice:245, rating:4.8, reviews:345, badge:"New", color:"#1a1a1a", tags:["Technical","Outdoor"], description:"Technical outdoor bag.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80" },
  { id:247, name:"Zara Crossbody", brand:"Zara", category:"Bags", price:59, originalPrice:79, rating:4.4, reviews:567, badge:"Sale", color:"#1a1a1a", tags:["Casual","Modern"], description:"Modern crossbody bag.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80" },
  { id:248, name:"H&M Tote", brand:"H&M", category:"Bags", price:39, originalPrice:55, rating:4.3, reviews:678, badge:"Sale", color:"#1a1a1a", tags:["Budget","Casual"], description:"Budget tote bag.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80" },
  { id:249, name:"Balenciaga Bag", brand:"Balenciaga", category:"Bags", price:1450, originalPrice:1800, rating:4.9, reviews:189, badge:"Premium", color:"#1a1a1a", tags:["Luxury","Designer"], description:"Luxury City bag.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80" },
  { id:250, name:"Celine Bag", brand:"Celine", category:"Bags", price:1680, originalPrice:2100, rating:4.9, reviews:156, badge:"Premium", color:"#1a1a1a", tags:["Luxury","Designer"], description:"Luxury Celine bag.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80" },
  { id:251, name:"Fendi Bag", brand:"Fendi", category:"Bags", price:1520, originalPrice:1900, rating:4.9, reviews:134, badge:"Premium", color:"#8b6914", tags:["Luxury","Designer"], description:"Fendi Zucca bag.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80" },
  { id:252, name:"Givenchy Bag", brand:"Givenchy", category:"Bags", price:1345, originalPrice:1680, rating:4.8, reviews:123, badge:"Premium", color:"#1a1a1a", tags:["Luxury","Designer"], description:"Givenchy Antigona.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80" },
  { id:253, name:"Mulberry Bag", brand:"Mulberry", category:"Bags", price:980, originalPrice:1220, rating:4.8, reviews:145, badge:"Sale", color:"#8b6914", tags:["Luxury","British"], description:"British luxury bag.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80" },
  { id:254, name:"Longchamp Tote", brand:"Longchamp", category:"Bags", price:189, originalPrice:245, rating:4.7, reviews:812, badge:"Sale", color:"#1a1a1a", tags:["Classic","French"], description:"Iconic Le Pliage.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80" },
  { id:255, name:"Samsonite Luggage", brand:"Samsonite", category:"Bags", price:189, originalPrice:250, rating:4.6, reviews:534, badge:"Sale", color:"#1a1a1a", tags:["Travel","Durable"], description:"Travel luggage.", sizes:["Medium","Large"], img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80" },
  { id:256, name:"Away Luggage", brand:"Away", category:"Bags", price:295, originalPrice:380, rating:4.8, reviews:678, badge:"New", color:"#1a1a1a", tags:["Travel","Modern"], description:"Modern luggage.", sizes:["Carry-On","Checked"], img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80" },
  { id:257, name:"Rimowa Luggage", brand:"Rimowa", category:"Bags", price:495, originalPrice:650, rating:4.9, reviews:456, badge:"Premium", color:"#8b6914", tags:["Luxury","Travel"], description:"Premium luggage.", sizes:["Cabin","Checked"], img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80" },
  { id:258, name:"Tumi Briefcase", brand:"Tumi", category:"Bags", price:395, originalPrice:520, rating:4.7, reviews:289, badge:"Sale", color:"#1a1a1a", tags:["Business","Premium"], description:"Business briefcase.", sizes:["One Size"], img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80" },
];

// Process products to assign unique category-based images (NO REPETITION)
const processProductsWithCategoryImages = (products) => {
  // Track image index per category
  const categoryImageIndices = {};
  
  return products.map((product) => {
    const category = product.category;
    // Initialize index for this category if not exists
    if (categoryImageIndices[category] === undefined) {
      categoryImageIndices[category] = 0;
    }
    
    // Get unique image for this category at current index
    const imageIndex = categoryImageIndices[category];
    const newImage = getCategoryImage(category, imageIndex);
    
    // Increment index for next product of this category
    categoryImageIndices[category]++;
    
    return {
      ...product,
      img: newImage
    };
  });
};

// Process products to ensure unique images per category (NO repetition)
const PROCESSED_PRODUCTS = processProductsWithCategoryImages(PRODUCTS);

const CATEGORIES = ["All", "Footwear", "Dresses", "Tops", "Bottoms", "Outerwear", "Bags", "Accessories"];
const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Top Rated", value: "rating" },
  { label: "Most Reviewed", value: "reviews" },
];

// ─── Badge colours ────────────────────────────────────────────────────────────
const badgeStyle = (badge) => {
  const map = { Sale:"badge-sale", New:"badge-new", Bestseller:"badge-best", Premium:"badge-premium" };
  return map[badge] || "";
};

// ─── Star Rating ──────────────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <span className="stars">
      {[1,2,3,4,5].map((i) => (
        <Star key={i} size={11} fill={i <= Math.round(rating) ? "currentColor" : "none"} />
      ))}
    </span>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, onOpen, delay }) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.stopPropagation();
    // For demo purposes, add the first available size
    const defaultSize = product.sizes[0];
    addToCart(product, defaultSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <article
      className="product-card"
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => onOpen(product)}
    >
      <div className="product-img-wrap">
        <img src={product.img} alt={product.name} className="product-img" loading="lazy" />
        <div className="product-color-dot" style={{ background: product.color }} />
        {product.badge && (
          <span className={`product-badge ${badgeStyle(product.badge)}`}>{product.badge}</span>
        )}
        <div className="product-overlay">
          <button
            className={`overlay-btn ${liked ? "liked" : ""}`}
            onClick={(e) => { e.stopPropagation(); setLiked((v) => !v); }}
            title="Wishlist"
          >
            <Heart size={16} fill={liked ? "currentColor" : "none"} />
          </button>
          <button className="overlay-btn" title="Quick view" onClick={(e) => { e.stopPropagation(); onOpen(product); }}>
            <Eye size={16} />
          </button>
        </div>
      </div>

      <div className="product-info">
        <p className="product-brand">{product.brand}</p>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-meta">
          <Stars rating={product.rating} />
          <span className="product-reviews">({product.reviews})</span>
        </div>
        <div className="product-tags">
          {product.tags.map((t) => (
            <span key={t} className="product-tag">{t}</span>
          ))}
        </div>
        <div className="product-footer">
          <div className="product-price-wrap">
            <span className="product-price">₹{(product.price * 83).toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span className="product-original">₹{(product.originalPrice * 83).toLocaleString('en-IN')}</span>
            )}
          </div>
          <button
            className={`add-cart-btn ${added ? "added" : ""}`}
            onClick={handleAdd}
          >
            {added ? <Check size={15} /> : <ShoppingCart size={15} />}
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── Product Modal ─────────────────────────────────────────────────────────────
function ProductModal({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const esc = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, [onClose]);

  if (!product) return null;
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={20} /></button>

        <div className="modal-grid">
          <div className="modal-img-wrap">
            <img src={product.img} alt={product.name} className="modal-img" />
            {discount && <span className="modal-discount">–{discount}% off</span>}
          </div>

          <div className="modal-details">
            <div className="modal-top">
              <p className="product-brand modal-brand">{product.brand}</p>
              <span className={`product-badge ${badgeStyle(product.badge)}`}>{product.badge}</span>
            </div>
            <h2 className="modal-title">{product.name}</h2>

            <div className="modal-rating">
              <Stars rating={product.rating} />
              <span className="modal-rating-num">{product.rating}</span>
              <span className="product-reviews">· {product.reviews} reviews</span>
            </div>

            <div className="modal-price-row">
              <span className="modal-price">₹{(product.price * 83).toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className="product-original modal-orig">₹{(product.originalPrice * 83).toLocaleString('en-IN')}</span>
              )}
            </div>

            <p className="modal-desc">{product.description}</p>

            <div className="modal-sizes">
              <p className="modal-section-label">Select Size</p>
              <div className="size-grid">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className={`size-btn ${selectedSize === s ? "size-selected" : ""}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="modal-tags-row">
              <Tag size={13} />
              {product.tags.map((t) => (
                <span key={t} className="product-tag">{t}</span>
              ))}
            </div>

            <div className="modal-actions">
              <button
                className={`btn-primary modal-add-btn ${added ? "btn-success" : ""}`}
                onClick={() => {
                  if (selectedSize) {
                    addToCart(product, selectedSize);
                    setAdded(true);
                    setTimeout(() => setAdded(false), 2000);
                  }
                }}
                disabled={!selectedSize}
              >
                {added ? <><Check size={16} /> Added!</> : <><ShoppingCart size={16} /> {selectedSize ? "Add to Cart" : "Select a size"}</>}
              </button>
              <button
                className={`icon-btn modal-wish-btn ${liked ? "liked" : ""}`}
                onClick={() => setLiked((v) => !v)}
              >
                <Heart size={18} fill={liked ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Collections Page ─────────────────────────────────────────────────────────
export default function CollectionsPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const sortRef = useRef(null);

  useEffect(() => {
    const h = (e) => { if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const filtered = useMemo(() => {
    let list = [...PROCESSED_PRODUCTS];
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (sort === "reviews") list.sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [category, search, sort]);

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* Page hero */}
      <section className="page-hero collections-hero">
        <div className="page-hero-bg" />
        <div className="page-hero-content">
          <span className="page-eyebrow"><Sparkles size={13} /> Curated Selection</span>
          <h1 className="page-title">Collections</h1>
          <p className="page-subtitle">
            {PROCESSED_PRODUCTS.length} hand-picked pieces across {CATEGORIES.length - 1} categories.
          </p>
        </div>
      </section>

      {/* Controls */}
      <div className="collections-controls">
        {/* Search */}
        <div className="search-wrap">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search products, brands, tags…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch("")}><X size={14} /></button>
          )}
        </div>

        <div className="controls-right">
          {/* Sort */}
          <div className="sort-wrap" ref={sortRef}>
            <button className="sort-btn" onClick={() => setSortOpen((v) => !v)}>
              <SlidersHorizontal size={15} />
              {SORT_OPTIONS.find((o) => o.value === sort)?.label}
              <ChevronDown size={14} className={sortOpen ? "chevron-open" : ""} />
            </button>
            {sortOpen && (
              <div className="sort-dropdown">
                {SORT_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    className={`sort-option ${sort === o.value ? "sort-active" : ""}`}
                    onClick={() => { setSort(o.value); setSortOpen(false); }}
                  >
                    {sort === o.value && <Check size={13} />}
                    {o.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <span className="results-count">{filtered.length} products</span>
        </div>
      </div>

      {/* Category pills */}
      <div className="category-pills-wrap">
        <div className="category-pills">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`category-pill ${category === c ? "pill-active" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
              {c !== "All" && (
                <span className="pill-count">
                  {PROCESSED_PRODUCTS.filter((p) => p.category === c).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <main className="collections-grid-wrap">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <Search size={48} className="empty-icon" />
            <h3>No products found</h3>
            <p>Try a different search term or category.</p>
            <button className="btn-primary" onClick={() => { setSearch(""); setCategory("All"); }}>
              Clear filters <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} onOpen={setSelectedProduct} delay={i * 40} />
            ))}
          </div>
        )}
      </main>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}