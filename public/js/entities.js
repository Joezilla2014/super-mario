import {loadMario} from './entities/Mario.js';
import {loadGoombaBrown, loadGoombaBlue} from './entities/Goomba.js';
import {loadKoopaGreen, loadKoopaBlue} from './entities/Koopa.js';
import {loadBullet} from './entities/Bullet.js';
import {loadCannon} from './entities/Cannon.js';
import {loadBrickSharpnel} from './entities/BrickSharpnel.js';

export function loadEntities(audioContext) {
    const entityFactories = {};

    function addAs(name) {
        return factory => entityFactories[name] = factory;
    }

    function setup(loader, name) {
        return loader(audioContext).then(addAs(name));
    }

    return Promise.all([
        setup(loadMario, 'mario'),
        setup(loadGoombaBrown, 'goomba-brown'),
        setup(loadGoombaBlue, 'goomba-blue'),
        setup(loadKoopaGreen, 'koopa-green'),
        setup(loadKoopaBlue, 'koopa-blue'),
        setup(loadBullet, 'bullet'),
        setup(loadCannon, 'cannon'),
        setup(loadBrickSharpnel, 'brickSharpnel'),
    ])
    .then(() => entityFactories);
}
