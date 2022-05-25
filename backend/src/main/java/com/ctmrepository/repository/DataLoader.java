package com.ctmrepository.repository;

import java.util.Arrays;

import com.ctmrepository.model.MinecraftMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DataLoader {

    private MinecraftMapRepository repo;

    @Autowired
    public DataLoader(MinecraftMapRepository repo) {
        this.repo = repo;
        LoadData();
    }

    // String name, long uploadDate, String author, String length
    // int objectiveMain, int objectiveBonus, String difficulty,
    // String descriptionShort, long downloadCount, String type,
    // String imageUrl, String series, String minecraftVersion

    private void LoadData() {
        MinecraftMap[] publishedMaps = {
                new MinecraftMap("Moonlight", 0, "The CTMC", "Long", 17, 54, "Medium",
                        "Moonlight is the lovechild of the Rookiewreck mapping event, featuring dozens of builders creating full-length areas over the span of a single month!",
                        899, "Linear Branching", "/images/5886020644119590.webp", "Rookiewreck", "1.17.1", true),
                new MinecraftMap("Divinity's End", 0, "The DE Team", "Long", 13, 16, "Medium",
                        "Divinity's End is a massive collaborative CTM map featuring areas from some of the best mapmakers the CTMC has to offer. As the final entry on the Pantheon series, it features action packed, heavily customized gameplay for you to enjoy either by yourself or with as many friends as you want.",
                        21850, "Branching", "/images/div.webp", "Pantheon", "1.16.5", true),
                new MinecraftMap("Monstrosity", 20190118, "Cold Fusion", "Medium", 12, 0, "Medium",
                        "A great map for newcomers to the CTM genre. Explore a massive network of caves mysteriously abandoned by the once great ARCANE Company. Delve deep enough, and you might just find out why they fled.",
                        6602, "Branching", "/images/3.webp", "None", "1.8.8", true),
                new MinecraftMap("Unassuming", 20190118, "Tala", "Short", 3, 0, "Easy",
                        "A simple, straightforward map that is exactly what it looks like on the surface! No tricks, no twists, just pure fun! \r\nRemember to use your noggin, and have fun!",
                        2157, "Linear", "/images/4.webp", "None", "1.12", true),
                new MinecraftMap("WinterStorm", 20190118, "Tecnocraft2802", "Medium", 3, 0, "Medium",
                        "WINTER STORM es un mapa MiniCTM de la 1.12.2.<br>\r\nEstÃ¡s atrapado en las altas montaÃ±as bajo una tormenta de nieve, tendrÃ¡s que sobrevir como puedas y intentar no morir por causa de la hipotermia..",
                        2442, "Open World", "/images/8.webp", "Seasons Time", "1.12.2", true),
                new MinecraftMap("HOURGLASS", 20190118, "SrMaMr & Tecnocraft2802", "Short", 12, 0, "Medium",
                        "Hourglass es un Mapa MiniCTM Hardcore para la versiÃ³n 1.11.2", 2823, "Branching",
                        "/images/9.webp", "None", "1.11.2", true),
                new MinecraftMap("LAST NIGHT", 20190118, "Tecnocraft2802", "Short", 2, 0, "Hard",
                        "LAST NIGHT es un mapa MiniCTM Hardcore de la 1.12. \r\nTu verdadero enemigo es el Tiempo.",
                        1891, "Linear", "/images/10.webp", "None", "1.12", true),
                new MinecraftMap("The Harbinger", 20190118, "Kunii", "Short", 3, 0, "Hard",
                        "A brutal path of death and destruction... Let nothing stand in your way.  You are the harbinger of doom...",
                        3046, "Branching", "/images/11.webp", "Dark Realms", "1.13.2", true),
                new MinecraftMap("Minimalist", 20190118, "Kaladun", "Short", 16, 1, "Easy",
                        "A tiny map with a massive adventure! The classic 16-wool CTM where every wool dungeon is a 24 block cube. Downloaded 20,000 times, and so iconic it inspired the CTM community Austerity maps!",
                        4997, "Branching", "/images/12.webp", "None", "1.8", true),
                new MinecraftMap("Fantasy Challenge", 20190118, "MineBye", "Short", 2, 0, "Hard",
                        "A MiniCTM Hardcore, a real challenge. Be prepared to face your doom.", 1376, "Linear",
                        "/images/13.webp", "None", "1.12.2", true),
                new MinecraftMap("Gloom and Shroom", 20190114, "14er", "Short", 3, 0, "Medium",
                        "Delve into the mushroom filled caverns of what was once the only CTM map available for 1.13 (though now it has friends :D )",
                        1358, "Linear", "/images/GloomShroom.webp", "None", "1.13.2", true),
                new MinecraftMap("Rift Up", 20190122, "Stetofire", "Medium", 5, 0, "Medium",
                        "An obsidian spire has pierced up through a small island. Follow a trail of journals and discover its source!",
                        1916, "Adventure", "/images/14.webp", "None", "1.12", true),
                new MinecraftMap("The Corrupted Path", 20190319, "Heliceo", "Long", 18, 0, "Hard",
                        "Are you looking for a huge, challenging, heavily combat-oriented CTM map? Venture the infamous first installment of the Ragecraft series and fight your way to complete the monument in this insane adventure",
                        2794, "Open World", "/images/16.webp", "Ragecraft", "1.5.2", true),
                new MinecraftMap("From Flames Reborn", 20190319, "Gustavo Team", "Medium", 16, 0, "Medium",
                        "\"From Flames: Reborn\" is an open world CTM map, set in the post-apocalyptic world, based on the original \"From Flames\".",
                        1584, "Open World", "/images/17.webp", "None", "1.12", true),
                new MinecraftMap("Insomnia", 20190319, "Heliceo", "Long", 16, 16, "Hard",
                        "Are you looking for a huge, challenging, heavily combat-oriented map? Welcome to the map that changed completely the CTM genre taking mechanics and custom mobs to the next level",
                        5476, "Branching", "/images/18.webp", "Ragecraft", "1.7.2", true),
                new MinecraftMap("Infested Lands", 20190410, "Creepernick01", "Medium", 19, 0, "Medium",
                        "My first CTM map. I feel that I did a good effort for a first try. You will be put through 16 different areas to find wools. No intricate storylines or mechanics. Just pure, classic-style CTM.",
                        1772, "Branching", "/images/23.webp", "None", "1.8.9", true),
                new MinecraftMap("Goliath", 20190410, "renderXR", "Long", 19, 1, "Medium",
                        "From forests to deserts. Go diving in the deepest oceans or go spelunking in the darkest caves. This map is an environment based map. It is extremely vast so that explains its name. It starts off relatively easy, but it gets harder and harder over time. But be wary, the map has a fair amount of traps",
                        1663, "Branching", "/images/US1.webp", "Untold Stories", "1.8.9", true),
                new MinecraftMap("The Sower", 20190410, "renderXR", "Short", 8, 0, "Hard",
                        "In a world roses have withered and gloom filled the sky your objective is to find all flowers in the dark depths. Retrieve all flowers to reap the victory. You start in a barren wasteland filled with old barrows. As you explore these desolate ruins you will discover there is more than just old crypts below.",
                        1794, "Open World", "/images/USm1.webp", "Untold Stories", "1.13.2", true),
                new MinecraftMap("Myriad Caves", 20190410, "renderXR", "Long", 22, 54, "Hard",
                        "Myriad Caves, an extensive network of caves providing plenty to explore. This map is experimental in two ways. Firstly, the map layout is an open-world cave layout.Secondly, the map uses a different food/health system than a normal MC world. How far will you make it?",
                        2734, "Open World", "/images/US3.webp", "Untold Stories", "1.9.4", true),
                new MinecraftMap("Calamity Canyon", 20190410, "renderXR", "Medium", 17, 10, "Medium",
                        "These once fertile lands are now blighted and devoid of life. Dark clouds have covered the canyon and spread evil. Survival in this barren wasteland is difficult due to the absence of an infinite food source. Explore the mesa and uncover the secrets that it holds. Can you manage to stay alive?",
                        2757, "Open World", "/images/US5.webp", "Untold Stories", "1.12.2", true),
                new MinecraftMap("Soul Reaper", 20190723, "Krose", "Short", 4, 0, "Hard",
                        "Made for the 8th Strawberry Jam, this map presents a brutal challenge even for the veteran player thanks to the manipulation of health and natural regeneration. Test your patience and skills in this tough experience",
                        1004, "Open World", "/images/27.webp", "Extreme Adventures", "1.8", true),
                new MinecraftMap("Galaroth", 20190723, "Caecilleus", "Medium", 16, 0, "Very Hard",
                        "Battle your way through fire and ash in this 16 Objective UHC CTM for MC 1.12.2! It even has a custom soundtrack to listen to as you play! How cool is that?",
                        1744, "Branching", "/images/28.webp", "None", "1.12.2", true),
                new MinecraftMap("Marooned", 20190803, "Krose", "Short", 4, 0, "Easy",
                        "Made up of a number of small islands floating over void, this mini-CTM offers special loot, an innovative teleportation system and full multiplayer compatibility making this a blast to play!",
                        603, "Branching", "/images/29.webp", "Shattered Skies", "1.8.8", true)
        };

        MinecraftMap[] unpublishedMaps = {
                new MinecraftMap("Pipe Dream", 20190923, "XanaxMan", "Medium", 4, 2, "Medium",
                        "For Decades, man has tried to make efficient travel through pipes. Well now they have, leading to new worlds, each with their beauties and perils. Where will you go in these new worlds?",
                        626, "Branching", "/images/29.webp", "None", "1.8.8", false),
                new MinecraftMap("Teenage Dream", 20190903, "Katy Perry", "Short", 2, 0, "Medium",
                        "Let's go all the way tonight! No regrets, just love. We can dance, until we die! You and I, will be young forever... You make me Feel like I'm livin' a teenage dream! The way you turn me on, I can't sleep! Let's run away and don't ever look back, don't ever look back! My heart stops When you look at me, just one touch... Now, baby, I believe this is real. So take a chance and don't ever look back, don't ever look back",
                        965, "Linear", "/images/29.webp", "None", "1.8.8", false),
                new MinecraftMap("Particle Man", 19900115, "XanaxMan", "Medium", 4, 2, "Medium",
                        "Particle man, particle man \nDoing the things a particle can \nWhat's he like? It's not important \nParticle man",
                        22, "Linear", "/images/29.webp", "None", "1.8.8", false),
                new MinecraftMap("Horizon: Zero Dawn", 20170228, "AlloyFangirl", "Long", 42, 20, "Hard",
                        "Horizon is my favorite game ever, so I recreated it in Minecraft after I got drunk one weekend. Added Dialogue after I realized what I made. Play as a low res version of the best game ever!",
                        3145, "Open World", "/images/29.webp", "None", "1.8.8", false),
                new MinecraftMap("Pipe Dream 2", 20201223, "XanaxMan", "Medium", 4, 2, "Hard",
                        "After getting to the beautiful planet Raxacalicoricophallapatorius, you begin receiving a strange signal from one of the nearby moons. Could it be your people? Only one way to find out: Parkour! And pipes ofc",
                        1234, "Branching", "/images/29.webp", "None", "1.8.8", false)
        };

        Arrays.stream(publishedMaps).forEach(repo::save);
        Arrays.stream(unpublishedMaps).forEach(repo::save);
        repo.flush();
    }
}
