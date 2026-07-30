from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "hrea-dbms-free-notes.pdf"
pdfmetrics.registerFont(TTFont("DejaVu", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("DejaVu-Bold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))

TOPICS = [
    ("1. DBMS Fundamentals",
     "A database is an organised collection of related data. A DBMS is software that lets users define, store, retrieve, update and protect that data.",
     [
         ("Data and information", "Data is a raw fact. Information is processed data that has meaning for a decision."),
         ("Why DBMS?", "It reduces duplication, improves consistency, supports security, allows concurrent access and provides backup and recovery."),
         ("Schema and instance", "A schema is the database design. An instance is the actual data stored at a particular moment."),
         ("Three levels", "External level shows user views, conceptual level shows the complete logical design, and internal level describes physical storage."),
         ("Data independence", "Logical independence protects user views from logical design changes. Physical independence protects the logical design from storage changes."),
     ],
     "Exam tip: Conceptual schema describes the whole logical database, while an external schema describes one user view."),
    ("2. ER Diagram",
     "The Entity-Relationship model gives a visual design of data before tables are created.",
     [
         ("Entity and entity set", "An entity is one identifiable object. An entity set is a collection of similar entities."),
         ("Attributes", "Attributes may be simple, composite, single-valued, multivalued, stored or derived."),
         ("Relationships", "Relationships connect entity sets. Their degree may be unary, binary or ternary."),
         ("Cardinality", "Common mappings are one-to-one, one-to-many, many-to-one and many-to-many."),
         ("Weak entity", "A weak entity lacks a complete key and is identified through its owner plus a partial key."),
     ],
     "Exam tip: Total participation has minimum cardinality 1; partial participation may have minimum cardinality 0."),
    ("3. Relational Model and Functional Dependencies",
     "The relational model represents data in tables called relations and uses dependencies to describe valid relationships among attributes.",
     [
         ("Basic terms", "A row is a tuple, a column is an attribute, degree is the number of attributes, and cardinality is the number of tuples."),
         ("Functional dependency", "X -> Y means that equal X values must always have equal Y values."),
         ("Trivial dependency", "X -> Y is trivial when Y is a subset of X."),
         ("Attribute closure", "X+ is the set of all attributes that can be determined from X using the given dependencies."),
         ("Minimal cover", "A minimal cover has single attributes on the right, no unnecessary left-side attributes and no redundant dependencies."),
     ],
     "Exam tip: Use attribute closure to test whether an attribute set is a superkey."),
    ("4. Keys and Integrity Constraints",
     "Keys identify tuples, connect tables and support the integrity rules that keep database values valid.",
     [
         ("Superkey", "Any attribute set that uniquely identifies a tuple."),
         ("Candidate key", "A minimal superkey. No proper subset can still uniquely identify a tuple."),
         ("Primary and alternate keys", "One candidate key is selected as primary; the remaining candidate keys are alternate keys."),
         ("Foreign key", "An attribute set that references a candidate or primary key in another relation."),
         ("Integrity", "Domain integrity controls allowed values, entity integrity forbids a null primary key, and referential integrity protects valid references."),
     ],
     "Exam tip: Every candidate key is a superkey, but every superkey is not a candidate key."),
    ("5. Normalization: 1NF to BCNF",
     "Normalization reduces redundancy and prevents insertion, deletion and update anomalies.",
     [
         ("1NF", "Every attribute value is atomic; repeating groups are removed."),
         ("2NF", "The relation is in 1NF and every non-prime attribute is fully dependent on every candidate key."),
         ("3NF", "For every non-trivial X -> A, X is a superkey or A is a prime attribute."),
         ("BCNF", "For every non-trivial X -> A, X must be a superkey."),
         ("Comparison", "BCNF is stricter than 3NF. A 3NF decomposition can preserve dependencies more easily."),
     ],
     "Exam tip: Partial dependency matters when a candidate key is composite."),
    ("6. Decomposition Properties and 4NF",
     "Decomposition splits a relation into smaller relations while aiming to preserve information and useful constraints.",
     [
         ("Lossless join", "Joining the decomposed relations recreates exactly the original relation without spurious tuples."),
         ("Dependency preservation", "Original functional dependencies can be checked without joining relations."),
         ("Multivalued dependency", "X ->> Y means a set of Y values depends on X independently of the remaining attributes."),
         ("4NF", "For every non-trivial multivalued dependency X ->> Y, X must be a superkey."),
     ],
     "Exam tip: Lossless join protects information; dependency preservation makes constraint checking practical."),
    ("7. SQL",
     "SQL is the standard language for defining structures, querying rows, changing data, managing permissions and controlling transactions.",
     [
         ("DDL", "CREATE, ALTER, DROP and TRUNCATE define or change database objects."),
         ("DML and queries", "INSERT, UPDATE and DELETE change rows; SELECT retrieves rows."),
         ("Filtering and grouping", "WHERE filters rows before grouping. HAVING filters groups after GROUP BY."),
         ("Joins", "INNER JOIN returns matches. Outer joins retain unmatched rows from one or both sides."),
         ("Transactions", "COMMIT makes changes permanent, ROLLBACK cancels uncommitted changes, and SAVEPOINT marks a rollback position."),
     ],
     "Exam tip: COUNT(column) ignores null values, while COUNT(*) counts rows."),
    ("8. File Organization and Indexing",
     "File organisation controls record placement. Indexes add search paths that can reduce disk access.",
     [
         ("Primary index", "Built on an ordered primary key, often with sparse entries."),
         ("Clustering index", "Built on an ordered non-key field; records with the same value are stored together."),
         ("Secondary index", "Provides another access path and is commonly dense."),
         ("Dense and sparse", "Dense indexes have an entry for every search-key value or record; sparse indexes contain selected entries."),
         ("B+ tree", "Internal nodes guide the search and leaf nodes store ordered entries linked for range access."),
     ],
     "Exam tip: B+ tree leaf nodes are linked, making ordered and range queries efficient."),
    ("9. Transaction Management",
     "A transaction is a logical unit of database work that must move the database from one consistent state to another.",
     [
         ("Atomicity", "All transaction operations happen, or none of them happen."),
         ("Consistency", "A committed transaction preserves declared database rules."),
         ("Isolation", "Concurrent transactions should behave as if executed safely apart."),
         ("Durability", "Committed results survive later failures."),
         ("Schedules", "A serial schedule completes one transaction before another. A serializable schedule has the same effect as a serial order."),
     ],
     "Exam tip: Conflict serializability can be checked with a precedence graph; a cycle means it is not conflict serializable."),
    ("10. Concurrency Control",
     "Concurrency control prevents incorrect results when transactions read and write shared data at the same time.",
     [
         ("Locks", "A shared lock permits reading; an exclusive lock is required for writing."),
         ("Two-phase locking", "The growing phase acquires locks and the shrinking phase releases them."),
         ("Strict 2PL", "Exclusive locks are held until commit or abort, helping prevent cascading rollback."),
         ("Deadlock", "Transactions wait in a cycle. Detection commonly uses a wait-for graph."),
         ("Isolation levels", "Higher isolation prevents more anomalies but may reduce concurrency."),
     ],
     "Exam tip: Lost update, dirty read, unrepeatable read and phantom read are common concurrency anomalies."),
]

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="CoverTitle", parent=styles["Title"], fontName="DejaVu-Bold", fontSize=30, leading=34, textColor=colors.HexColor("#102b4e"), alignment=TA_CENTER, spaceAfter=10))
styles.add(ParagraphStyle(name="CoverSub", parent=styles["Normal"], fontName="DejaVu", fontSize=13, leading=19, textColor=colors.HexColor("#526a7b"), alignment=TA_CENTER))
styles.add(ParagraphStyle(name="Topic", parent=styles["Heading1"], fontName="DejaVu-Bold", fontSize=20, leading=24, textColor=colors.HexColor("#1769e0"), spaceAfter=10))
styles.add(ParagraphStyle(name="Lead", parent=styles["Normal"], fontName="DejaVu", fontSize=10.5, leading=16, textColor=colors.HexColor("#344b5c"), spaceAfter=12))
styles.add(ParagraphStyle(name="ItemHead", parent=styles["Heading3"], fontName="DejaVu-Bold", fontSize=10.5, leading=14, textColor=colors.HexColor("#102b4e"), spaceAfter=2))
styles.add(ParagraphStyle(name="ItemBody", parent=styles["Normal"], fontName="DejaVu", fontSize=9.5, leading=14, textColor=colors.HexColor("#526a7b")))
styles.add(ParagraphStyle(name="Tip", parent=styles["Normal"], fontName="DejaVu", fontSize=9.5, leading=14, textColor=colors.HexColor("#175a49")))
styles.add(ParagraphStyle(name="Small", parent=styles["Normal"], fontName="DejaVu", fontSize=8, leading=11, textColor=colors.HexColor("#71818d")))

def header_footer(canvas, doc):
    canvas.saveState()
    width, height = A4
    canvas.setStrokeColor(colors.HexColor("#dfe6ee"))
    canvas.line(18 * mm, 16 * mm, width - 18 * mm, 16 * mm)
    canvas.setFont("DejaVu", 8)
    canvas.setFillColor(colors.HexColor("#71818d"))
    canvas.drawString(18 * mm, 10 * mm, "HREA - Original free DBMS notes")
    canvas.drawRightString(width - 18 * mm, 10 * mm, f"Page {doc.page}")
    canvas.restoreState()

doc = SimpleDocTemplate(str(OUTPUT), pagesize=A4, rightMargin=20*mm, leftMargin=20*mm, topMargin=18*mm, bottomMargin=22*mm, title="HREA Free DBMS Notes", author="Himachal Recruitment Exam Academy")
story = [Spacer(1, 35*mm), Paragraph("HREA", styles["CoverTitle"]), Paragraph("DBMS Quick Revision Notes", styles["CoverTitle"]), Spacer(1, 8*mm), Paragraph("Free study guide for JOA IT and Himachal competitive examinations", styles["CoverSub"]), Spacer(1, 16*mm)]
cover = Table([["10 topics", "Core concepts", "Exam tips"], ["Beginner friendly", "Quick revision", "Free forever"]], colWidths=[52*mm]*3)
cover.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),colors.HexColor("#eff6ff")),("TEXTCOLOR",(0,0),(-1,-1),colors.HexColor("#1769e0")),("FONTNAME",(0,0),(-1,-1),"DejaVu-Bold"),("FONTSIZE",(0,0),(-1,-1),9),("ALIGN",(0,0),(-1,-1),"CENTER"),("GRID",(0,0),(-1,-1),0.5,colors.HexColor("#c7d9ef")),("TOPPADDING",(0,0),(-1,-1),10),("BOTTOMPADDING",(0,0),(-1,-1),10)]))
story += [cover, Spacer(1, 18*mm), Paragraph("How to use this guide", styles["ItemHead"]), Paragraph("Read one topic, revise its exam tip, and then solve the matching topic-wise questions on the HREA website. These notes are an original summary for learning and revision.", styles["Lead"]), PageBreak()]

for idx, (title, lead, items, tip) in enumerate(TOPICS):
    story += [Paragraph(title, styles["Topic"]), Paragraph(lead, styles["Lead"])]
    for heading, body in items:
        story.append(KeepTogether([Paragraph(heading, styles["ItemHead"]), Paragraph(body, styles["ItemBody"]), Spacer(1, 4*mm)]))
    tip_box = Table([[Paragraph(f"<b>Quick exam tip:</b> {tip.replace('Exam tip: ', '')}", styles["Tip"])]], colWidths=[165*mm])
    tip_box.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),colors.HexColor("#eaf8f3")),("BOX",(0,0),(-1,-1),0.7,colors.HexColor("#8ed0b8")),("LEFTPADDING",(0,0),(-1,-1),10),("RIGHTPADDING",(0,0),(-1,-1),10),("TOPPADDING",(0,0),(-1,-1),9),("BOTTOMPADDING",(0,0),(-1,-1),9)]))
    story += [tip_box]
    if idx < len(TOPICS)-1:
        story.append(PageBreak())

story += [Spacer(1, 8*mm), Paragraph("Continue learning", styles["ItemHead"]), Paragraph("Use the HREA website for the complete free DBMS question bank with PYQ and Expert Practice filters, answers and explanations.", styles["Lead"]), Paragraph("Independent educational material. HREA is not affiliated with HPRCA or the Government of Himachal Pradesh.", styles["Small"])]
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
print(OUTPUT)
