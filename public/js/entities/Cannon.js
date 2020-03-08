import Entity, {Trait} from '../Entity.js';
import Emitter from '../traits/Emitter.js';

export function loadCannon(entityFactory) {
    return createCannonFactory(entityFactory);
}

function createCannonFactory(entityFactory) {
    const createBullet = entityFactory.bulletBill;

    const bulletEmitter = (entity, level) => {
        const bullet = createBullet();
        bullet.vel.set(80, 0);
        bullet.pos.copy(entity.pos);
        level.entities.add(bullet);
    };

    return function createCannon() {
        const cannon = new Entity();

        const emitter = new Emitter();
        emitter.interval = 4;
        emitter.emitters.push(bulletEmitter);

        cannon.addTrait(emitter);

        return cannon;
    };
}