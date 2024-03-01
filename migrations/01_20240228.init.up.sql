SET SCHEMA 'jubo';

-- patients --
CREATE TABLE IF NOT EXISTS patients
(
    id SERIAL NOT NULL
        CONSTRAINT packages_pkey
        PRIMARY KEY,
    uuid UUID DEFAULT gen_random_uuid(),
    patient_name VARCHAR NOT NULL,
    created_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT NOW() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS patients_uuid
    ON patients (uuid);

-- orders --
CREATE TABLE IF NOT EXISTS orders
(
    id SERIAL NOT NULL
        CONSTRAINT orders_pkey
        PRIMARY KEY,
    uuid UUID DEFAULT gen_random_uuid(),
    message TEXT DEFAULT NULL,
    patient_id INT NOT NULL CONSTRAINT fk_patients_id
    	REFERENCES patients (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
    created_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP(6) WITHOUT TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS orders_uuid
    ON orders (uuid);

CREATE UNIQUE INDEX IF NOT EXISTS orders_patient_id
    ON orders (patient_id);