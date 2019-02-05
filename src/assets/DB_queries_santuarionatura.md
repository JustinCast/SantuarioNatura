Create TABLE comments (
  id SERIAL NOT NULL,
  comment VARCHAR(800),
  name VARCHAR(100),
  allow BOOLEAN DEFAULT FALSE
);

CREATE TABLE reservation (
  id SERIAL NOT NULL,
  name VARCHAR(50) NOT NULL ,
  email VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NULL,
  country VARCHAR(50) NOT NULL,
  adults INT NOT NULL,
  children INT NULL,
  activity VARCHAR(50) NOT NULL,
  activity_date date  NOT NULL ,
  feeding BOOLEAN,
  transport BOOLEAN,
  lodging BOOLEAN,
  lodging_start_sate date NULL,
  lodging_finish_date date NULL,
  payment_method VARCHAR(50) NOT NULL,
  comment VARCHAR(200) NULL,
  CONSTRAINT pk_reservation_id PRIMARY KEY (id)
);

CREATE  TABLE activity(
  id SERIAL NOT NULL,
  name VARCHAR(200) NOT NULL,
  description VARCHAR(800) NOT NULL,
  difficulty VARCHAR(50) NOT NULL,
  includes VARCHAR(800) NULL,
  duration VARCHAR(20) NOT NULL,
  bring VARCHAR(800) NULL,
  location VARCHAR(800) NOT NULL,
  access VARCHAR(800) NOT NULL,
  visits INT NULL,
  in_offer BOOLEAN NOT NULL,
  CONSTRAINT pk_id PRIMARY KEY (id)
);

--Creation of procedures

CREATE OR REPLACE FUNCTION insert_reservation (
  _name VARCHAR(50),
  _email VARCHAR(50),
  _phone VARCHAR(20),
  _country VARCHAR(50),
  _adults INT,
  _children INT,
  _activity VARCHAR(50),
  _activity_date date,
  _feeding BOOLEAN,
  _transport BOOLEAN,
  _lodging BOOLEAN,
  _lodging_start_sate date,
  _lodging_finish_date date,
  _payment_method VARCHAR(50),
  _comment VARCHAR(200)
) RETURNS VOID AS
$$
  BEGIN
    INSERT INTO reservation(name, email, phone, country, adults, children, activity, activity_date, feeding, transport, lodging, lodging_start_sate, lodging_finish_date, payment_method, comment)
    VALUES(_name,_email,_phone,_country,_adults,_children,_activity,_activity_date,
           _feeding,_transport,_lodging,_lodging_start_date,_lodging_finish_date,_payment_method,
           _comment);
  END
$$
  LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION delete_reservation (
  _id INT
) RETURNS VOID AS
$$
  BEGIN
    DELETE FROM reservation WHERE id = _id;
  END
$$
  LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION insert_comments (
  _comment VARCHAR(800),
  _name VARCHAR(100),
  _allow BOOLEAN
) RETURNS VOID AS
$$
  BEGIN
    INSERT INTO comments(comment, name, allow)
    VALUES(_comment,_name,_allow);
  END
$$
  LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION delete_comments (
  _id INT
) RETURNS VOID AS
$$
  BEGIN
    DELETE FROM comments WHERE id = _id;
  END
$$
  LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION select_login_user(OUT id INT,OUT name VARCHAR,OUT username VARCHAR,OUT password VARCHAR,OUT role BOOLEAN, OUT email VARCHAR, _username VARCHAR, _password VARCHAR)
RETURNS SETOF RECORD AS
$BODY$
DECLARE
    reg RECORD;
BEGIN
    FOR reg IN SELECT * FROM _user WHERE username=_username AND password=_password LOOP
      id := reg.id;
      name := reg.name;
      username:= reg.username;
      password:= reg.password;
      role:= reg.role;
      email:= reg.email;
      RETURN NEXT;
    END LOOP;
    RETURN;
END
$BODY$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION insert_user (
  _name VARCHAR(50),
  _username VARCHAR(15),
  _password VARCHAR(250),
  _role BOOLEAN,
  _email VARCHAR(50)
) RETURNS VOID AS
$$
  BEGIN
    INSERT INTO _user(name, username, password, role, email) VALUES(_name,_username,_password,_role,_email);
  END
$$
  LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION delete_user (
  _id INT
) RETURNS VOID AS
$$
  BEGIN
    DELETE FROM _user WHERE id = _id;
  END
$$
  LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION delete_activity (
  _id INT
) RETURNS VOID AS
$$
  BEGIN
    DELETE FROM activity WHERE id = _id;
  END
$$
  LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION select_activities(OUT name VARCHAR,OUT description VARCHAR,OUT difficulty VARCHAR,OUT includes VARCHAR,OUT duration VARCHAR,OUT bring VARCHAR,OUT location VARCHAR,OUT access VARCHAR,OUT visits INTEGER,OUT in_offer BOOLEAN,OUT id INTEGER)
RETURNS SETOF RECORD AS
$BODY$
DECLARE
    reg RECORD;
BEGIN
    FOR reg IN SELECT * FROM activity LOOP
      name := reg.name;
      description:= reg.description;
      difficulty:= reg.difficulty;
      includes:= reg.includes;
      duration:= reg.duration;
      bring:= reg.bring;
      location:= reg.location;
      access:= reg.access;
      visits:= reg.visits;
      in_offer:= reg.in_offer;
      id:= reg.id;
      RETURN NEXT;
    END LOOP;
    RETURN;
END
$BODY$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION insert_activity(_name VARCHAR(200), _description VARCHAR(800), _difficulty VARCHAR(50), _includes VARCHAR(800), _duration VARCHAR(20), _bring VARCHAR(800), _location VARCHAR(800), _access VARCHAR(800), _visits INT, _in_offer BOOLEAN)
  returns VOID
language plpgsql
as $$
BEGIN
    INSERT INTO activity(name, description, difficulty, includes, duration, bring, location, access, visits, in_offer)
    VALUES (_name, _description, _difficulty, _includes, _duration, _bring, _location, _access, _visits, _in_offer);
END
$$;

CREATE OR REPLACE FUNCTION update_activity(_name VARCHAR(200), _description VARCHAR(800), _difficulty VARCHAR(50), _includes VARCHAR(800), _duration VARCHAR(20), _bring VARCHAR(800), _location VARCHAR(800), _access VARCHAR(800), _visits INT, _in_offer BOOLEAN,_id INT)
  returns VOID
language plpgsql
as $$
BEGIN
    UPDATE activity SET name=_name, description=_description, difficulty=_difficulty, includes=_includes,
    duration=_duration, bring=_bring, location=_location, access=_access, visits=_visits, in_offer=_in_offer WHERE id=_id;
END
$$;

CREATE OR REPLACE FUNCTION select_users(OUT id INT,OUT name VARCHAR,OUT username VARCHAR,OUT password VARCHAR,OUT role BOOLEAN, OUT email VARCHAR)
RETURNS SETOF RECORD AS
$BODY$
DECLARE
    reg RECORD;
BEGIN
    FOR reg IN SELECT * FROM _user LOOP
      id := reg.id;
      name := reg.name;
      username:= reg.username;
      password:= reg.password;
      role:= reg.role;
      email:= reg.email;
      RETURN NEXT;
    END LOOP;
    RETURN;
END
$BODY$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION update_user (
  _id INT,
  _name VARCHAR(50),
  _username VARCHAR(15),
  _password VARCHAR(250),
  _role BOOLEAN,
  _email VARCHAR(50)
) RETURNS VOID AS
$$
  BEGIN
    UPDATE _user SET name=_name,username=_username,password=_password,role=_role,email=_email WHERE id=_id;
  END
$$
  LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION insert_rate_and_quotas (
  _from INT,
  _to INT,
  _rate INT,
  _id_activity INT
) RETURNS VOID AS
$$
  BEGIN
    INSERT INTO rate_and_quotas("from","to",rate,id_activity) VALUES(_from,_to,_rate,_id_activity);
  END
$$
  LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION delete_rate_and_quotas (
  _id INT
) RETURNS VOID AS
$$
  BEGIN
    DELETE FROM rate_and_quotas WHERE id = _id;
  END
$$
  LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION update_rate_and_quotas (
  _id INT,
  _from INT,
  _to INT,
  _rate INT,
  _id_activity INT
) RETURNS VOID AS
$$
  BEGIN
    UPDATE rate_and_quotas SET "from"=_from,"to"=_to,rate=_rate,id_activity=_id_activity WHERE id=_id;
  END
$$
  LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION select_rate_and_quotas_of_activity (OUT "from" INT,OUT "to" INT, OUT rate INT, _id_activity INT)
RETURNS SETOF RECORD AS
$BODY$
DECLARE
    reg RECORD;
BEGIN
    FOR reg IN SELECT * FROM rate_and_quotas WHERE id_activity = _id_activity LOOP
      "from" := reg."from";
      "to" := reg."to";
      rate:= reg.rate;
      RETURN NEXT;
    END LOOP;
    RETURN;
END
$BODY$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION select_comments ( OUT name VARCHAR, OUT comment VARCHAR, OUT id INT )
RETURNS SETOF RECORD AS
$BODY$
DECLARE
    reg RECORD;
BEGIN
    FOR reg IN SELECT * FROM comments WHERE allow=true LOOP
       name := reg.name;
       comment := reg.comment;
        id := reg.id;
       RETURN NEXT;
    END LOOP;
    RETURN;
END
$BODY$ LANGUAGE 'plpgsql';

CREATE FUNCTION select_best_four_activities ( OUT name VARCHAR, OUT visits VARCHAR )
RETURNS SETOF RECORD AS
$BODY$
DECLARE
    reg RECORD;
BEGIN
    FOR reg IN SELECT * FROM activity ORDER BY visits DESC LIMIT 4 LOOP
       name := reg.name;
       visits := reg.visits;
       RETURN NEXT;
    END LOOP;
    RETURN;
END
$BODY$ LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION accept_comment (
  _id INT
) RETURNS VOID AS
$$
  BEGIN
    UPDATE comments SET allow=TRUE WHERE id=_id;
  END
$$
  LANGUAGE 'plpgsql';

  CREATE OR REPLACE FUNCTION select_comments_to_confirm( OUT name VARCHAR, OUT comment VARCHAR,OUT id INT )
RETURNS SETOF RECORD AS
$BODY$
DECLARE
    reg RECORD;
BEGIN
    FOR reg IN SELECT * FROM comments WHERE allow=FALSE LOOP
       name := reg.name;
       comment := reg.comment;
        id := reg.id;
       RETURN NEXT;
    END LOOP;
    RETURN;
END
$BODY$ LANGUAGE 'plpgsql';


