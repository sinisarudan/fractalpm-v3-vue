// A base class for versioned models with common (Big 6) attributes

export class VersionedModel {
  /**
   * The unique identifier for the project (UUID)
   * Backend counterpart: entity_id: UUID = field(default_factory=uuid4, metadata={'field_type': 'record_id'})
   * @type {(string | undefined)}
   */
  entity_id;

  /**
   * UUID
   * @type {(string | undefined)}
   */
  version;

  /**
   * entity_id <UUID> of the previous version
   * @type {(string | undefined)}
   */
  previous_version;

  /**
   * UUID
   * @type {(boolean)}
   */
  active = true;

  /**
   * entity_id <UUID> of the `Person` who changed it
   * @type {(string | undefined)}
   */
  changed_by_id;

  /**
   * The date when the project was last changed.
   * @type {Date}
   * @default new Date()
   */
  changed_on = new Date();

  /**
   * @param {(string | undefined)} entity_id - The unique identifier for the project (UUID).
   * @param {(string | undefined)} version - UUID.
   * @param {(string | undefined)} previous_version - entity_id <UUID> of the previous version.
   * @param {boolean} [active=true] - UUID.
   * @param {(string | undefined)} changed_by_id - entity_id <UUID> of the `Person` who changed it.
   * @param {Date} [changed_on=new Date()] - The date when the project was last changed.
   */
  constructor(
    entity_id,
    version,
    previous_version,
    changed_by_id,
    active = true,
    changed_on = new Date()
  ) {
    this.entity_id = entity_id;
    this.version = version;
    this.previous_version = previous_version;
    this.active = active;
    this.changed_by_id = changed_by_id;
    this.changed_on = changed_on;
  }
}
