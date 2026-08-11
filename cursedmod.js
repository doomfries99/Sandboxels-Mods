// Material Apocalypse
// Sandboxels 1.15

elements.material_apocalypse = {
    color: ["#8A00FF", "#FF00FF", "#00FFFF"],
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 2500,

    tick: function(pixel) {
        // Check the 8 surrounding cells
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {

                if (dx === 0 && dy === 0) continue;

                let x = pixel.x + dx;
                let y = pixel.y + dy;

                if (
                    x < 0 || y < 0 ||
                    x >= width || y >= height
                ) continue;

                let other = pixelMap[y][x];

                if (other && other.element === "water") {

                    // Remove the cursed material
                    deletePixel(pixel.x, pixel.y);

                    // Remove the water
                    deletePixel(x, y);

                    // Explosion
                    explodeAt(pixel.x, pixel.y, 15);

                    // Materials to release
                    let materials = [
                        "sand",
                        "dirt",
                        "mud",
                        "salt",
                        "sugar",
                        "gravel",
                        "clay",
                        "glass",
                        "iron",
                        "copper",
                        "gold",
                        "silver",
                        "wood",
                        "plant",
                        "grass",
                        "fire",
                        "smoke",
                        "steam",
                        "acid",
                        "oil",
                        "snow",
                        "ice",
                        "lava",
                        "oxygen",
                        "carbon_dioxide"
                    ];

                    // Spray 150 random materials
                    for (let i = 0; i < 150; i++) {

                        let angle = Math.random() * Math.PI * 2;
                        let distance = Math.random() * 18;

                        let spawnX = Math.round(
                            pixel.x + Math.cos(angle) * distance
                        );

                        let spawnY = Math.round(
                            pixel.y + Math.sin(angle) * distance
                        );

                        if (
                            spawnX >= 0 &&
                            spawnY >= 0 &&
                            spawnX < width &&
                            spawnY < height &&
                            !pixelMap[spawnY][spawnX]
                        ) {

                            let material =
                                materials[
                                    Math.floor(
                                        Math.random() * materials.length
                                    )
                                ];

                            if (elements[material]) {
                                createPixel(
                                    material,
                                    spawnX,
                                    spawnY
                                );
                            }
                        }
                    }

                    return;
                }
            }
        }
    }
};
