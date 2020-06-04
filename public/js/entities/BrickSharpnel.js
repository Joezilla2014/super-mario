import Entity from '../Entity.js';
import Gravity from '../traits/Gravity.js';
import Velocity from '../traits/Velocity.js';
import {loadAudioBoard} from '../loaders/audio.js';
import {loadSpriteSheet} from '../loaders/sprite.js';
import LifeLimit from '../traits/LifeLimit.js';

export function loadBrickSharpnel(audioContext) {
    return Promise.all([
        loadSpriteSheet('brick-sharpnel'),
        loadAudioBoard('brick', audioContext),
    ])
    .then(([sprite, audio]) => {
        return createFactory(sprite, audio);
    });
}

function createPool(factory, size) {
    const pool = [];
    let count = 0;
    for (let i = 0; i < size; i++) {
        pool.push(factory());
    }
    return () => {
        const entity = pool[count++ % pool.length];
        entity.lifetime = 0;
        return entity;
    }
}

function createFactory(sprite, audio) {
    function draw(context) {
        sprite.draw('bullet', context, 0, 0);
    }

    const pool = []
    for (let i = 0; i < 2; i++) {
        const entity = new Entity();
        entity.size.set(8, 8);
        entity.addTrait(new LifeLimit());
        entity.addTrait(new Gravity());
        entity.addTrait(new Velocity());
        entity.draw = draw;
        pool.push(entity);
    }

    return createPool(function createBrickShrapnel() {
        const entity = new Entity();
        entity.audio = audio;
        entity.size.set(8, 8);
        entity.addTrait(new LifeLimit());
        entity.addTrait(new Gravity());
        entity.addTrait(new Velocity());
        entity.draw = draw;
        return entity;
    }, 4);
}
