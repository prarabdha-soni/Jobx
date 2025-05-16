/*
  # Create job seekers table and related schemas

  1. New Tables
    - job_seekers
      - seeker_id (text, primary key)
      - whatsapp_number (text)
      - status (text)
      - created_at (timestamp)
      - updated_at (timestamp)
    - job_applications
      - id (uuid, primary key)
      - seeker_id (text, references job_seekers)
      - job_id (uuid, references jobs)
      - status (text)
      - test_score (integer)
      - created_at (timestamp)
      - updated_at (timestamp)
    - jobs
      - id (uuid, primary key)
      - title (text)
      - company_id (uuid, references companies)
      - description (text)
      - requirements (text)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create job_seekers table
CREATE TABLE IF NOT EXISTS job_seekers (
  seeker_id text PRIMARY KEY,
  whatsapp_number text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company_id uuid NOT NULL,
  description text,
  requirements text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seeker_id text REFERENCES job_seekers(seeker_id),
  job_id uuid REFERENCES jobs(id),
  status text DEFAULT 'applied',
  test_score integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE job_seekers ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Companies can view job seekers who applied to their jobs"
  ON job_seekers
  FOR SELECT
  TO authenticated
  USING (
    seeker_id IN (
      SELECT ja.seeker_id 
      FROM job_applications ja 
      JOIN jobs j ON ja.job_id = j.id 
      WHERE j.company_id = auth.uid()
    )
  );

CREATE POLICY "Companies can view their own jobs"
  ON jobs
  FOR ALL
  TO authenticated
  USING (company_id = auth.uid());

CREATE POLICY "Companies can view applications for their jobs"
  ON job_applications
  FOR SELECT
  TO authenticated
  USING (
    job_id IN (
      SELECT id 
      FROM jobs 
      WHERE company_id = auth.uid()
    )
  );